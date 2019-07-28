from django.conf.urls import include
from django.urls import path
from . import views
from .api.album_views import *
from .api import auth_views
from .api.song_views import *


urlpatterns = [
    path('albums/', views.dashboard, name='albums'),
    path('albums/<int:id>/', views.detail, name='albums.detail'),
    path('api/albums/', album_index, name='api.albums'),
    path('api/albums/<int:id>/', album_detail, name='api.albums.detail'),
    path('api/auth/login/', auth_views.auth_login, name='api.auth.login'),
    path('api/auth/user/', auth_views.auth_user_current, name='api.auth.user'),
    path('api/songs/', song_index, name='api.songs'),
    path('auth/login/', views.dashboard, name='auth.login'),
    path('auth/logout/', views.auth_logout, name='auth.logout'),
    path('now-playing/', views.dashboard, name='now-playing'),
    path('', views.dashboard, name='index')
]
