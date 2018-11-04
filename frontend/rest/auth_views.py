from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer


class AuthUserView(APIView):
    def get(self, request, format=None):
        if not request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        return Response(UserSerializer(instance=request.user).data)


class LogoutView(APIView):
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
