from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include

def health(_request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('rsvp.urls')),
    path("", health),  # <- optional: now "/" returns {"status":"ok"}

]
