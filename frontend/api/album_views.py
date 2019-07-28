from frontend.models import Album
from django.http import HttpRequest, JsonResponse
from .serializers import serialize_album


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
