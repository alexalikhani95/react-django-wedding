# tables/models.py
from django.db import models

class Table(models.Model):
    name = models.CharField(max_length=100, blank=True, default="")
    # Hard-coded capacity of 10 seats
    capacity = models.PositiveSmallIntegerField(default=10, editable=False)

    def __str__(self) -> str:
        return self.name or f"Table {self.pk}"
