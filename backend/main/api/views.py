from urllib import response
from rest_framework.viewsets import ModelViewSet
from rest_framework.mixins import UpdateModelMixin
from ..models import Album
from ..models import Song
from.serializers import AlbumSerializer
from.serializers import SongSerializer
import os
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

class AlbumViewSet(ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class SongViewSet(ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
class FilteredSongViewSet(ModelViewSet):
    queryset = Song.objects.exclude(tab_file_name='')
    serializer_class = SongSerializer
    
