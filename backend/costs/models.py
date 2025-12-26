from django.db import models
from decimal import Decimal

class CostItem(models.Model):
    name = models.CharField(max_length=100)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"

    @property
    def remaining_amount(self):
        """Calculate remaining amount - always accurate, never stored"""
        return self.total_amount - self.paid_amount
    
    @property
    def is_fully_paid(self):
        """Check if the cost is fully paid"""
        return self.remaining_amount <= 0
