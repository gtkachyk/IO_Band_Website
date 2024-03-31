from urllib import response
from rest_framework.viewsets import ModelViewSet
from rest_framework.mixins import UpdateModelMixin
from ..models import Album
from ..models import Song
from ..models import GuestBookEntry
from .serializers import AlbumSerializer
from .serializers import SongSerializer
from .serializers import GuestBookEntrySerializer
import os
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status

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
    
class GuestBookEntryViewSet(ModelViewSet):
    queryset = GuestBookEntry.objects.all()
    serializer_class = GuestBookEntrySerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
## An example of a view set that includes only songs without tabs
# class FilteredSongViewSet(ModelViewSet):
#     queryset = Song.objects.exclude(tab_file_name='')
#     serializer_class = SongSerializer
    
