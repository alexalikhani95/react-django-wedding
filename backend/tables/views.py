from rest_framework import generics
from .models import Table, Seat
from .serializers import TableSerializer

class TableCreate(generics.CreateAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

    def perform_create(self, serializer):
        """
        Create the Table, then create Seat rows 1..capacity for that new table.
        This runs only when a table is created through this API view.
        """
        table = serializer.save()
        # create missing seats up to capacity (idempotent for safety)
        existing = set(table.seats.values_list("seat_number", flat=True))
        to_create = [Seat(table=table, seat_number=n) for n in range(1, table.capacity + 1) if n not in existing]
        if to_create:
            Seat.objects.bulk_create(to_create)

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
