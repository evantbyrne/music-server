from django.contrib.auth.models import User
from frontend import models
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = (
            'email',
            'id',
            'is_staff',
            'username',
        )
        read_only_fields = (
            'id',
            'is_staff',
            'username',
        ),
