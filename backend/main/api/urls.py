from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlbumViewSet
from .views import SongViewSet
from .views import FilteredSongViewSet

main_router = DefaultRouter()
main_router.register(r'albums', AlbumViewSet, basename='album')
main_router.register(r'songs', SongViewSet, basename='song')
main_router.register(r'filtered_songs', FilteredSongViewSet, basename='filtered_song')

urlpatterns = [
    path('', include(main_router.urls)),
]