from django.contrib.auth.models import User
from frontend import models
from typing import Dict, Any


def serialize_album(album: models.Album, show_songs: bool = False) -> Dict[str, Any]:
    results = {
        "cover": serialize_file(album.cover),
        "id": album.id,
        "name": album.name,
        "slug": album.slug,
    }

    if show_songs:
        results["songs"] = [serialize_song(song, show_artists=True) for song in album.songs.all()]

    return results


def serialize_artist(artist: models.Artist) -> Dict[str, Any]:
    return {
        "id": artist.id,
        "name": artist.name,
    }


def serialize_file(file: Any) -> Any:
    return file.url if file else None


def serialize_song(song: models.Song, show_album: bool = False, show_artists: bool = False) -> Dict[str, Any]:
    results = {
        "album_order": song.album_order,
        "file": serialize_file(song.file),
        "id": song.id,
        "name": song.name,
    }

    if show_album:
        results["album"] = serialize_album(song.album) if song.album else None

    if show_artists:
        results["artists"] = [serialize_artist(artist) for artist in song.artists.all()]

    return results


def serialize_user(user: User) -> Dict[str, Any]:
    return {
        "id": user.id,
        "is_staff": user.is_staff,
        "email": user.email,
        "username": user.username,
    }
