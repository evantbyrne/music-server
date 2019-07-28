from frontend.models import Song
from django.http import HttpRequest, JsonResponse
from .serializers import serialize_song


def song_index(request: HttpRequest) -> JsonResponse:
    return JsonResponse({
        "results": {
            "songs": [serialize_song(song, show_album=True) for song in Song.objects.all()],
        },
    })
