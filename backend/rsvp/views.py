from rest_framework import generics
from .models import Rsvp
from .serializers import RsvpSerializer

class RsvpCreate(generics.CreateAPIView):
    queryset = Rsvp.objects.all()
    serializer_class = RsvpSerializer

class RsvpList(generics.ListAPIView):
    queryset = Rsvp.objects.all()
    serializer_class = RsvpSerializer