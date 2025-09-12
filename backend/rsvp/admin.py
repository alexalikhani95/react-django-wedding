from django.contrib import admin
from .models import Rsvp

@admin.register(Rsvp)
class RsvpAdmin(admin.ModelAdmin):
    list_display = ['name', 'attending', 'starter', 'main', 'dessert', 'created_at']
    list_filter = ['attending', 'created_at']
    search_fields = ['name']
    readonly_fields = ['created_at']