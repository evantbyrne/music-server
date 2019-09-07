from frontend.models import Artist
from django.http import HttpRequest, JsonResponse
from .serializers import serialize_album, serialize_artist


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
