# guests/serializers.py
from rest_framework import serializers
from .models import Guest

class GuestSerializer(serializers.ModelSerializer):
    table_id = serializers.IntegerField(source='table.id', read_only=True)
    seat_number = serializers.IntegerField(read_only=True)

    class Meta:
        model = Guest
        fields = ['id', 'name', 'party', 'table_id', 'seat_number']
