from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views
from .rest import auth_views

urlpatterns = [
    path('api/token/', obtain_auth_token, name='auth_token'),
    path('auth/login/', views.dashboard, name='auth_login'),
    path('auth/logout/', auth_views.LogoutView.as_view(), name='auth_logout'),
    path('auth/user/', auth_views.AuthUserView.as_view(), name='auth_user'),
    # path('<str:project_slug>/add/<int:kanban_column_id>/', views.add, name='add'),
    # path('<str:project_slug>/card/<int:card_id>/', views.card, name='card'),
    # path('<str:project_slug>/card/<int:card_id>/revision/<int:card_revision_id>/', views.card, name='card_revision'),
    # path('<str:project_slug>/', views.index, name='index'),
    path('', views.dashboard, name='index')
]
