from rest_framework import serializers
from .models import Table, Seat

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ["id", "seat_number", "guest_id"]

class TableSerializer(serializers.ModelSerializer):
    seats = SeatSerializer(many=True, read_only=True)  # uses related_name="seats"

    class Meta:
        model = Table
        fields = ["id", "name", "capacity", "seats"]
