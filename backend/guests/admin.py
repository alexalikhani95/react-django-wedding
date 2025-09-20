from django.contrib import admin
from .models import Guest

@admin.register(Guest)
class GuestAdmin(admin.ModelAdmin):
    list_display = ("name", "party")
    list_filter = ("party",)
    search_fields = ("name",)
