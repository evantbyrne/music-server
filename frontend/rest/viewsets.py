from rest_framework.routers import DefaultRouter
from rest_framework.viewsets import ModelViewSet
from frontend import models
from . import serializers


class AlbumViewSet(ModelViewSet):
    queryset = models.Album.objects.all()
    serializer_class = serializers.AlbumListSerializer


class SongViewSet(ModelViewSet):
    queryset = models.Song.objects.all()
    serializer_class = serializers.SongListSerializer


router = DefaultRouter()
router.register(r'albums', AlbumViewSet)
router.register(r'songs', SongViewSet)
