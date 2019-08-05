from frontend.models import Artist
from django.http import HttpRequest, JsonResponse
from .serializers import serialize_artist


def artist_index(request: HttpRequest) -> JsonResponse:
    return JsonResponse({
        "results": {
            "artists": [serialize_artist(artist) for artist in Artist.objects.all()],
        },
    })
