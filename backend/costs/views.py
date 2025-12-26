from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CostItem 
from .serializers import CostSerializer


class CostItemCreate(generics.CreateAPIView):
    queryset = CostItem.objects.all()
    serializer_class = CostSerializer


class CostList(generics.ListAPIView):
    queryset = CostItem.objects.all()
    serializer_class = CostSerializer


class CostUpdate(generics.UpdateAPIView):
    queryset = CostItem.objects.all()
    serializer_class = CostSerializer


class CostDelete(generics.DestroyAPIView):
    queryset = CostItem.objects.all()
    serializer_class = CostSerializer