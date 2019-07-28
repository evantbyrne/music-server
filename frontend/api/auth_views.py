from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import HttpRequest, JsonResponse
from .serializers import serialize_user
import json


@require_POST
@csrf_exempt
def auth_login(request: HttpRequest) -> JsonResponse:
    data = json.loads(request.body)
    if type(data) == dict:
        username = data.get("username")
        password = data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({
                "results": {
                    "user": serialize_user(user),
                },
            })
    return JsonResponse({
        "error": "Invalid login credentials.",
    }, status=401)


def auth_user_current(request: HttpRequest) -> JsonResponse:
    return JsonResponse({
        "results": {
            "user": serialize_user(request.user),
        },
    })
