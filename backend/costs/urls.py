from django.urls import path
from .views import CostItemCreate, CostList, CostUpdate, CostDelete

urlpatterns = [
    path('costs/create/', CostItemCreate.as_view(), name="cost-item-create"),
    path('costs/list/', CostList.as_view(), name="cost-list"),
    path('costs/<int:pk>/update/', CostUpdate.as_view(), name="cost-update"),
    path('costs/<int:pk>/delete/', CostDelete.as_view(), name="cost-dedate"),
]