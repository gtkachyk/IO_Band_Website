from rest_framework.viewsets import ModelViewSet
from ..models import Album, Song, GuestBookEntry
from .serializers import AlbumSerializer, SongSerializer, GuestBookEntrySerializer
from rest_framework.response import Response
from rest_framework import status

import logging

logger = logging.getLogger(__name__)

class AlbumViewSet(ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

class SongViewSet(ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    
class GuestBookEntryViewSet(ModelViewSet):
    queryset = GuestBookEntry.objects.all()
    serializer_class = GuestBookEntrySerializer

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        logger.info(f'Full Request: {request.data}')

        request_data = request.data
        user_uuid = request_data.get("user_uuid")
        ip = request_data.get("ip")
        name = request_data.get("name")
        message = request_data.get("message")
        date = request_data.get("date")

        # Get all rows such that row.ip = ip. If more than 5 rows are returned, block post request
        if GuestBookEntry.objects.filter(ip=ip).count() >= 5:
            return Response({"error": "Too many entries from this IP address"}, status=status.HTTP_429_TOO_MANY_REQUESTS)

        return super().create(request, *args, **kwargs)
    
## An example of a view set that includes only songs without tabs
# class FilteredSongViewSet(ModelViewSet):
#     queryset = Song.objects.exclude(tab_file_name='')
#     serializer_class = SongSerializer
    
