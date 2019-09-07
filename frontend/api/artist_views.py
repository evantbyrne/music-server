from frontend.models import Artist
from django import forms
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .serializers import serialize_album, serialize_artist


class ArtistCreateForm(forms.ModelForm):
    class Meta:
        fields = (
            "name",
        )
        model = Artist


@require_POST
@csrf_exempt
def artist_create(request: HttpRequest) -> JsonResponse:
    form = ArtistCreateForm(request.POST)
    if not form.is_valid():
        return JsonResponse({
            "error": form.errors.get_json_data(),
        }, status=403)
    artist = form.save()
    return JsonResponse({
        "results": {
            "artist": serialize_artist(artist),
        },
    })


def artist_detail(request: HttpRequest, id: int) -> JsonResponse:
    artist = Artist.objects.filter(id=id).first()
    if not artist:
        return JsonResponse({
            "error": "Artist not found.",
        }, status=404)
    albums = []
    for song in artist.songs.all().select_related("album"):
        if not song.album in albums:
            albums.append(song.album)
    serialized = serialize_artist(artist)
    serialized["albums"] = [serialize_album(album, True) for album in albums]
    return JsonResponse({
        "results": {
            "artist": serialized,
        },
    })


def artist_index(request: HttpRequest) -> JsonResponse:
    return JsonResponse({
        "results": {
            "artists": [serialize_artist(artist) for artist in Artist.objects.all()],
        },
    })
