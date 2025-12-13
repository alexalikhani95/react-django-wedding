from django.db import models

class Rsvp(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    # Attendance separately
    night_before = models.CharField(
        max_length=10,
        choices=[("accept", "Accept"), ("decline", "Decline")],
        null=True,
        blank=True
    )
    wedding_day = models.CharField(
        max_length=10,
        choices=[("accept", "Accept"), ("decline", "Decline")],
        null=True,
        blank=True
    )

    # Menu choices
    starter = models.CharField(max_length=50, null=True, blank=True)
    main = models.CharField(max_length=50, null=True, blank=True)
    dessert = models.CharField(max_length=50, null=True, blank=True)

    # Allergies
    allergies = models.CharField(max_length=10, null=True, blank=True)  # "none" or "yes"
    allergy_notes = models.CharField(max_length=200, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
