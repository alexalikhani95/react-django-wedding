from django.urls import path
from .views import RsvpCreate, RsvpList

urlpatterns = [
    path('rsvp/create/', RsvpCreate.as_view(), name="rsvp-create"),
    path('rsvp/list/', RsvpList.as_view(), name="rsvp-list")
]