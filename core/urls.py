from django.conf.urls.static import static
from django.urls import include, path
from . import settings


urlpatterns = [
    path('', include('frontend.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
