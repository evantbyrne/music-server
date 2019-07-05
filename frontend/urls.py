from django.conf.urls import include
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views
from .rest import auth_views, viewsets

urlpatterns = [
    path('albums/', views.dashboard, name='albums'),
    path('api/', include(viewsets.router.urls)),
    path('api/token/', obtain_auth_token, name='auth_token'),
    path('auth/login/', views.dashboard, name='auth_login'),
    path('auth/logout/', auth_views.LogoutView.as_view(), name='auth_logout'),
    path('auth/user/', auth_views.AuthUserView.as_view(), name='auth_user'),
    path('song/<int:id>/', views.detail, name='song'),
    path('', views.dashboard, name='index')
]
