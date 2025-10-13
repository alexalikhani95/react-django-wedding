from django.db import models
from guests.models import Guest

class Table(models.Model):
    name = models.CharField(max_length=100, blank=True, default="")
    # fixed capacity (you set default=10). editable=False prevents changing in admin forms by default.
    capacity = models.PositiveSmallIntegerField(default=10, editable=False)

    def __str__(self) -> str:
        return self.name or f"Table {self.pk}"


class Seat(models.Model):
    # ForeignKey to Table: each Seat is linked to exactly one Table.
    # related_name="seats" lets you access a table's seats via `example_table.seats.all()`.
    # on_delete=models.CASCADE - if the Table is deleted, all its Seat rows are deleted too.
    table = models.ForeignKey(Table, related_name="seats", on_delete=models.CASCADE)

    seat_number = models.PositiveSmallIntegerField()

    # The guest that is seated here
    # ForeignKey to the Guest model. Using the string "guests.Guest" avoids an import cycle.
    # null=True allows this DB column to be NULL (meaning: seat is empty).
    # blank=True allows admin/forms to leave it empty.
    # on_delete=models.SET_NULL: if the Guest is deleted, the seat remains but guest FK is cleared.
    # related_name="seat" creates a reverse accessor from Guest -> Seat (see note below).
    guest = models.ForeignKey(
        Guest,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="seat",
    )

    class Meta:
        # This ensures you can't have two "Seat 1" records for the same table, but you CAN have "Seat 1" on different tables
        # you can't create two Seat rows with the same seat_number on the same table.
        unique_together = (("table", "seat_number"),)

        # ordering defines the default ordering for QuerySets: ascending by seat_number.
        # e.g., table.seats.all() will come back as seat_number 1,2,3,...
        ordering = ("seat_number",)

    def __str__(self):
        return f"Table {self.table_id} - Seat {self.seat_number}"
