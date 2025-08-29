from django.urls import path
from .views import RsvpCreate, RsvpList

urlpatterns = [
    path('rsvp/', RsvpCreate.as_view(), name="rsvp-create"),
    path('rsvp/', RsvpList.as_view(), name="rsvp-list")
]