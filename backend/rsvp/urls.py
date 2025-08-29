from django.urls import path
from .views import RsvpCreate, RsvpList, RsvpDelete

urlpatterns = [
    path('rsvp/create/', RsvpCreate.as_view(), name="rsvp-create"),
    path('rsvp/list/', RsvpList.as_view(), name="rsvp-list"),
    path('rsvp/<int:pk>/delete/', RsvpDelete.as_view(), name="rsvp-delete")
]