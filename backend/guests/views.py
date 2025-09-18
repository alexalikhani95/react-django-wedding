from rest_framework import generics
from .models import Guest
from .serializers import GuestSerializer

class GuestCreate(generics.CreateAPIView):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer

class GuestList(generics.ListAPIView):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer

class GuestDelete(generics.DestroyAPIView):
    queryset = Guest.objects.all()