from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import SongViewSet

song_router = DefaultRouter()
song_router.register(r'songs', SongViewSet)