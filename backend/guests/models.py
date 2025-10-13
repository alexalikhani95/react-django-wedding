# guests/models.py
from django.db import models
from django.db.models import Q

class Guest(models.Model):
    PARTY_CHOICES = [('bride', 'Bride'), ('groom', 'Groom')]

    name = models.CharField(max_length=100)
    party = models.CharField(max_length=100, choices=PARTY_CHOICES, default='bride')

    # seating (single global plan)
    table = models.ForeignKey(
        "tables.Table",
        null=True, blank=True,
        on_delete=models.SET_NULL,              # deleting a table unseats guests
        related_name="guests",
    )
    seat_number = models.PositiveSmallIntegerField(null=True, blank=True)

    class Meta:
        constraints = [
            # A seat (table + seat_number) can be used only once
            models.UniqueConstraint(
                fields=["table", "seat_number"],
                name="uniq_seat_per_table",
                condition=Q(seat_number__isnull=False),
            ),
            # Either both table & seat_number are NULL (unassigned),
            # or both are present and seat_number is 1..10
            models.CheckConstraint(
                check=(
                    (Q(table__isnull=True) & Q(seat_number__isnull=True)) |
                    (Q(table__isnull=False) & Q(seat_number__gte=1) & Q(seat_number__lte=10))
                ),
                name="table_and_seat_both_null_or_valid",
            ),
        ]

    def __str__(self):
        return self.name
