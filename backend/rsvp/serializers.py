from rest_framework import serializers
from .models import Rsvp

class RsvpSerializer(serializers.ModelSerializer):
    class Meta:
      model = Rsvp  
      fields = "__all__"

