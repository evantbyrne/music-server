from frontend.models import Album, Artist
from django import forms
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .serializers import serialize_album
import json


class AlbumCreateForm(forms.ModelForm):
    artist = forms.ModelChoiceField(queryset=Artist.objects.all())
    class Meta:
        fields = (
            "artist",
            "name",
        )
        model = Album


@require_POST
@csrf_exempt
def album_create(request: HttpRequest) -> JsonResponse:
    data = json.loads(request.body)
    if type(data) == dict:
        form = AlbumCreateForm({
            "artist": data.get("artist"),
            "name": data.get("name"),
        })
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
    return JsonResponse({
        "error": "Requires JSON body containing 'artist' and 'name'.",
    }, status=403)


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
