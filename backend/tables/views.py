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
        # create missing seats up to capacity (idempotent for safety)
        existing = set(table.seats.values_list("seat_number", flat=True))
        to_create = [Seat(table=table, seat_number=n) for n in range(1, table.capacity + 1) if n not in existing]
        if to_create:
            Seat.objects.bulk_create(to_create)

class AssignSeat(generics.UpdateAPIView):
    """
    Assign a guest to a specific seat in a table.
    """
    queryset = Seat.objects.all()

    def patch(self, request, *args, **kwargs):
        guest_id = request.data.get("guest_id")
        seat_id = kwargs.get("pk")

        try:
            seat = Seat.objects.get(pk=seat_id)
            guest = Guest.objects.get(pk=guest_id)
        except (Seat.DoesNotExist, Guest.DoesNotExist):
            return Response({"detail": "Seat or guest not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if seat already has a guest
        seat.guest = guest
        seat.save()

        # Update guest's table and seat_number fields
        guest.table = seat.table
        guest.seat_number = seat.seat_number
        guest.save()

        return Response({"seat_id": seat.id, "guest_id": guest.id})

class TableList(generics.ListAPIView):
    queryset = Table.objects.all().order_by("id")  # pk order since there's no number
    serializer_class = TableSerializer

class TableDelete(generics.DestroyAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

    # keep it simple: unseat guests before deleting the table
    def perform_destroy(self, instance):
        from guests.models import Guest  # local import to avoid circular
        Guest.objects.filter(table=instance).update(table=None, seat_number=None)
        super().perform_destroy(instance)
