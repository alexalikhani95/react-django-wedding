from rest_framework import generics
from .models import Table
from .serializers import TableSerializer

class TableCreate(generics.CreateAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

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
