from django.urls import path
from .views import AssignSeat, TableCreate, TableList, TableDelete

urlpatterns = [
    path("tables/create/", TableCreate.as_view(), name="create"),
    path("tables/list/", TableList.as_view(), name="list"),
    path("tables/<int:pk>/delete/", TableDelete.as_view(), name="delete"),
    path("seats/<int:pk>/assign/", AssignSeat.as_view(), name="assign-seat"),
]
