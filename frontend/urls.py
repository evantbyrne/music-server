from django.conf.urls import include
from django.urls import path
from . import views
from .api import album_views
from .api import artist_views
from .api import auth_views
from .api import song_views


urlpatterns = [
    path('albums/', views.dashboard, name='albums'),
    path('albums/<int:id>/', views.detail, name='albums.detail'),
    path('albums/<int:id>/add-songs/', views.detail, name='albums.add-songs'),
    path('albums/<int:id>/delete/', views.detail, name='albums.delete'),
    path('api/albums/', album_views.album_index, name='api.albums'),
    path('api/albums/create/', album_views.album_create, name='api.albums.create'),
    path('api/albums/<int:id>/', album_views.album_detail, name='api.albums.detail'),
    path('api/albums/<int:id>/add-songs/', album_views.album_add_songs, name='api.albums.add-songs'),
    path('api/albums/<int:id>/delete/', album_views.album_delete, name='api.albums.delete'),
    path('api/artists/', artist_views.artist_index, name='api.artists'),
    path('api/artists/create/', artist_views.artist_create, name='api.artists.create'),
    path('api/artists/<int:id>/', artist_views.artist_detail, name='api.artists.detail'),
    path('api/auth/login/', auth_views.auth_login, name='api.auth.login'),
    path('api/auth/user/', auth_views.auth_user_current, name='api.auth.user'),
    path('api/songs/', song_views.song_index, name='api.songs'),
    path('artists/', views.dashboard, name='artists'),
    path('artists/<int:id>/', views.detail, name='artists.detail'),
    path('auth/login/', views.dashboard, name='auth.login'),
    path('auth/logout/', views.auth_logout, name='auth.logout'),
    path('create/album/', views.dashboard, name='create.album'),
    path('create/artist/', views.dashboard, name='create.artist'),
    path('now-playing/', views.dashboard, name='now-playing'),
    path('', views.dashboard, name='index')
]
