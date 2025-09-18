from django.db import models

class Guest(models.Model):
    PARTY_CHOICES = [
        ('bride', 'Bride'),
        ('groom', 'Groom'),
    ]
    
    name = models.CharField(max_length=100)
    party = models.CharField(
        max_length=100,
        choices=PARTY_CHOICES,
        default='bride'
    )

    def __str__(self):
        return f"{self.name}"