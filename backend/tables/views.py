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
            # Assign guest to seat
            seat.guest = guest
            seat.save()

            # Update guest's table and seat_number fields
            guest.table = seat.table
            guest.seat_number = seat.seat_number
            guest.save()

        return Response(
            {"seat_id": seat.id, "guest_id": guest.id},
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