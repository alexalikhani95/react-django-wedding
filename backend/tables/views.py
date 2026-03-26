from django.db import transaction
from guests.models import Guest
from .models import Table, Seat
from .serializers import TableSerializer
from rest_framework import generics, status
from rest_framework.response import Response


class TableCreate(generics.CreateAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

    def perform_create(self, serializer):
        table = serializer.save()
        existing = set(table.seats.values_list("seat_number", flat=True))
        to_create = [
            Seat(table=table, seat_number=n) 
            for n in range(1, table.capacity + 1) 
            if n not in existing
        ]
        if to_create:
            Seat.objects.bulk_create(to_create)


class AssignSeat(generics.UpdateAPIView):
    """Assign a guest to a specific seat in a table."""
    queryset = Seat.objects.all()

    def patch(self, request, *args, **kwargs):
        guest_id = request.data.get("guest_id")
        seat = self.get_object()  # Uses queryset, handles 404

        try:
            guest = Guest.objects.get(pk=guest_id)
        except Guest.DoesNotExist:
            return Response(
                {"detail": "Guest not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

        with transaction.atomic():
            # Local helpers to keep swap logic readable without changing behavior.
            def unseat(seat_obj: Seat) -> None:
                seat_obj.guest = None
                seat_obj.save(update_fields=["guest"])

            def seat_guest(seat_obj: Seat, guest_obj: Guest) -> None:
                seat_obj.guest = guest_obj
                seat_obj.save(update_fields=["guest"])

            def set_guest_location(
                guest_obj: Guest,
                table_obj: Table | None,
                seat_number: int | None,
            ) -> None:
                guest_obj.table = table_obj
                guest_obj.seat_number = seat_number
                guest_obj.save(update_fields=["table", "seat_number"])

            # Lock rows involved in the reassignment to keep swaps consistent.
            target_seat = Seat.objects.select_for_update().get(pk=seat.pk)
            moving_guest = Guest.objects.select_for_update().get(pk=guest.pk)

            # Seat where the moving guest currently sits (if any).
            source_seat = (
                Seat.objects.select_for_update()
                .filter(guest=moving_guest)
                .exclude(pk=target_seat.pk)
                .first()
            )

            target_guest = target_seat.guest
            swapped_guest_id = None

            # If dropping onto an occupied seat:
            # - If moving_guest was already seated somewhere else, we do a swap.
            # - If moving_guest was unseated, we displace (unseat) the target_guest.
            if target_guest and target_guest.id != moving_guest.id:
                target_guest = Guest.objects.select_for_update().get(pk=target_guest.id)
                swapped_guest_id = target_guest.id

                if source_seat:
                    # Swap: temporarily unseat the moving guest to avoid violating
                    # the Guest unique constraint on (table, seat_number).
                    unseat(source_seat)
                    set_guest_location(moving_guest, None, None)

                    # Move the displaced guest into the now-empty source seat.
                    seat_guest(source_seat, target_guest)
                    set_guest_location(
                        target_guest,
                        source_seat.table,
                        source_seat.seat_number,
                    )
                else:
                    # Displace: unseat the target guest.
                    unseat(target_seat)
                    set_guest_location(target_guest, None, None)

            # If the moving guest was seated elsewhere, clear that seat (after swap/displace).
            if source_seat and source_seat.guest_id == moving_guest.id:
                unseat(source_seat)

            # Finally, seat the moving guest on the target seat.
            seat_guest(target_seat, moving_guest)
            set_guest_location(
                moving_guest,
                target_seat.table,
                target_seat.seat_number,
            )

        return Response(
            {"seat_id": seat.id, "guest_id": guest.id, "swapped_guest_id": swapped_guest_id},
            status=status.HTTP_200_OK
        )


class TableList(generics.ListAPIView):
    queryset = Table.objects.all().order_by("id")
    serializer_class = TableSerializer


class TableDelete(generics.DestroyAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

    def perform_destroy(self, instance):
        with transaction.atomic():
            # Unassign all guests from this table before deletion
            Guest.objects.filter(table=instance).update(
                table=None, 
                seat_number=None
            )
            super().perform_destroy(instance)