from rest_framework import serializers
from .models import Guest

class GuestSerializer(serializers.ModelSerializer):
    table = serializers.IntegerField(source='table.id', read_only=True, allow_null=True)
    seat_number = serializers.IntegerField(read_only=True, allow_null=True)

    class Meta:
        model = Guest
        fields = ['id', 'name', 'party', 'table', 'seat_number']
