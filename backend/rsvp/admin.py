from django.contrib import admin
from .models import Rsvp


@admin.register(Rsvp)
class RsvpAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "night_before",
        "wedding_day",
        "starter",
        "main",
        "dessert",
        "allergies",
        "created_at",
    ]
    list_filter = ["night_before", "wedding_day", "allergies", "created_at"]
    search_fields = ["name"]
    readonly_fields = ["created_at"]
