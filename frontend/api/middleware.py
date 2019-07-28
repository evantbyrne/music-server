from django.http import HttpRequest, JsonResponse


def require_auth(get_response):
    def middleware(request: HttpRequest):
        print(request)
        if request.path.startswith("/api/") and request.path != "/api/auth/login/" and not request.user.is_authenticated:
            return JsonResponse({
                "error": "Not logged in.",
            }, status=401)
        return get_response(request)

    return middleware
