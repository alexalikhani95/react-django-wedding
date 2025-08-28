from django.db import models

class Rsvp(models.Model):
    name = models.CharField(max_length=100)
    attending = models.CharField(max_length=10)
    starter = models.CharField(max_length=50, null=True, blank=True)
    main = models.CharField(max_length=50, null=True, blank=True)
    dessert = models.CharField(max_length=50, null=True, blank=True)
    allergies = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.attending})"

