from django.urls import path
from .views import RegisterAPIView, CurrentUserAPIView


urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('user/me/', CurrentUserAPIView.as_view(), name='current-user'),
]
