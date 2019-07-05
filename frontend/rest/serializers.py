from django.contrib.auth.models import User
from frontend import models
from rest_framework import serializers


class AlbumSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Album
        fields = (
            'cover',
            'name',
            'slug',
        )


class AlbumListSerializer(serializers.HyperlinkedModelSerializer):
    songs = serializers.SerializerMethodField()

    def get_songs(self, album):
        songs = []
        for song in album.songs.all():
            songs.append(SongSerializer(instance=song).data)
        return songs

    class Meta:
        model = models.Album
        fields = (
            'cover',
            'id',
            'name',
            'slug',
            'songs',
        )


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Artist
        fields = (
            'name',
        )


class SongSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Song
        fields = (
            'album_order',
            'file',
            'id',
            'name',
        )


class SongListSerializer(serializers.HyperlinkedModelSerializer):
    album = serializers.SerializerMethodField()
    artists = serializers.SerializerMethodField()

    def get_album(self, song):
        return AlbumSerializer(instance=song.album).data if song.album else None

    def get_artists(self, song):
        artists = []
        for artist in song.artists.all():
            artists.append(ArtistSerializer(instance=artist).data)
        return artists

    class Meta:
        model = models.Song
        fields = (
            'album',
            'album_order',
            'artists',
            'file',
            'id',
            'name',
        )


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = (
            'email',
            'id',
            'is_staff',
            'username',
        )
        read_only_fields = (
            'id',
            'is_staff',
            'username',
        ),
