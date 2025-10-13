from django.db import transaction
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Guest
from .serializers import GuestSerializer

class GuestCreate(generics.CreateAPIView):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer


class GuestList(generics.ListAPIView):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer


class GuestDelete(generics.DestroyAPIView):
    """Delete a guest and clear their seat assignment if they have one."""
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer

    def perform_destroy(self, instance):
        """Clear seat before deleting guest."""
        with transaction.atomic():
            # If guest has a seat, clear it before deletion
            if instance.table and instance.seat_number:
                from tables.models import Seat
                try:
                    seat = Seat.objects.get(table=instance.table, seat_number=instance.seat_number)
                    seat.guest = None
                    seat.save()
                except Seat.DoesNotExist:
                    pass
            
            # Now delete the guest
            super().perform_destroy(instance)


class RemoveFromSeat(generics.UpdateAPIView):
    """Remove a guest from their seat and table without deleting the guest."""
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer

    def patch(self, request, *args, **kwargs):
        guest = self.get_object()

        with transaction.atomic():
            # If guest has a seat, clear it
            if guest.table and guest.seat_number:
                from tables.models import Seat
                try:
                    seat = Seat.objects.get(table=guest.table, seat_number=guest.seat_number)
                    seat.guest = None
                    seat.save()
                except Seat.DoesNotExist:
                    pass

            # Clear guest's table and seat assignment
            guest.table = None
            guest.seat_number = None
            guest.save()

        return Response(
            {"guest_id": guest.id, "status": "unassigned"}, 
            status=status.HTTP_200_OK
        )