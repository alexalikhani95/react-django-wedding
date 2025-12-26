from rest_framework import serializers
from .models import CostItem

class CostSerializer(serializers.ModelSerializer):
    # These are @property methods from the model, not database fields
    # ReadOnlyField() makes them available in the API response but prevents them from being set via API
    remaining_amount = serializers.ReadOnlyField()
    is_fully_paid = serializers.ReadOnlyField()
    
    class Meta:
        model = CostItem
        fields = "__all__"