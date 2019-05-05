from rest_framework.routers import DefaultRouter
from frontend import models
from . import serializers

from rest_framework.viewsets import ModelViewSet


class SongViewSet(ModelViewSet):
    # lookup_field = 'id'
    queryset = models.Song.objects.all()
    serializer_class = serializers.SongSerializer


router = DefaultRouter()
router.register(r'songs', SongViewSet)
