from frontend.models import Album, Artist, Song
from django import forms
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .serializers import serialize_album, serialize_song
import json


class AlbumCreateForm(forms.ModelForm):
    artist = forms.ModelChoiceField(queryset=Artist.objects.all())
    class Meta:
        fields = (
            "artist",
            "cover",
            "name",
        )
        model = Album


class AlbumSongForm(forms.ModelForm):
    class Meta:
        fields = (
            "file",
        )
        model = Song


@require_POST
@csrf_exempt
def album_add_songs(request: HttpRequest, id: int) -> JsonResponse:
    album = Album.objects.filter(id=id).first()
    if not album:
        return JsonResponse({
            "error": "Album not found.",
        }, status=404)
    songs = []
    for file in request.FILES.getlist("songs"):
        form = AlbumSongForm(dict(), {"file": file})
        if not form.is_valid():
            return JsonResponse({
                "error": form.errors.get_json_data(),
            }, status=403)
        song = form.save(commit=False)
        song.album = album
        song.create_name_from_file()
        songs.append(song)
    for song in songs:
        song.save()
    return JsonResponse({
        "results": {
            "songs": [serialize_song(song) for song in songs],
        },
    })


@require_POST
@csrf_exempt
def album_create(request: HttpRequest) -> JsonResponse:
    form = AlbumCreateForm(request.POST, request.FILES)
    if not form.is_valid():
        return JsonResponse({
            "error": form.errors.get_json_data(),
        }, status=403)
    album = form.save()
    return JsonResponse({
        "results": {
            "album": serialize_album(album),
        },
    })


@require_POST
@csrf_exempt
def album_delete(request: HttpRequest, id: int) -> JsonResponse:
    album = Album.objects.filter(id=id).first()
    if not album:
        return JsonResponse({
            "error": "Album not found.",
        }, status=404)
    album.delete()
    return JsonResponse({
        "results": {
            "album": {
                "id": id,
            },
        },
    })


def album_detail(request: HttpRequest, id: int) -> JsonResponse:
    album = Album.objects.filter(id=id).first()
    if not album:
        return JsonResponse({
            "error": "Album not found.",
        }, status=404)
    return JsonResponse({
        "results": {
            "album": serialize_album(album, True),
        },
    })


def album_index(request: HttpRequest) -> JsonResponse:
    return JsonResponse({
        "results": {
            "albums": [serialize_album(album, True) for album in Album.objects.all()],
        },
    })
