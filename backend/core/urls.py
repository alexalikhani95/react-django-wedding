from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include

def health(_request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('rsvp.urls')),
    path("", health),  # To not make admin crash for now when visting just http://localhost:8000/ not http://localhost:8000/rsvp etc

]
