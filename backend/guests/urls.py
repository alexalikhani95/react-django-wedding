from django.urls import path
from .views import GuestCreate, GuestList, GuestDelete

urlpatterns = [
    path('guests/create/', GuestCreate.as_view(), name="guest-create"),
    path('guests/list/', GuestList.as_view(), name="guest-list"),
    path('guests/<int:pk>/delete/', GuestDelete.as_view(), name="guest-delete")
]