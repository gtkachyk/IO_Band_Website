from rest_framework.viewsets import ModelViewSet
from ..models import Album, Song, GuestBookEntry
from .serializers import AlbumSerializer, SongSerializer, GuestBookEntrySerializer
from rest_framework.response import Response
from rest_framework import status
import logging
import ipaddress
import datetime
from rest_framework.decorators import action
from rest_framework.response import Response

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
    
    def get_queryset(self):
        album = self.request.query_params.get('album')
        if album:
            return Song.objects.filter(album=album)
        return super().get_queryset()

def is_valid_ip(ip):
    try:
        ipaddress.ip_address(ip)
        return True
    except ValueError:
        return False
    
def is_valid_date(date):
    try:
        datetime.date.fromisoformat(date)
        return True
    except ValueError:
        return False

def is_valid_time(time):
    if not isinstance(time, str):
        return False
    if not (len(time) == 12 or len(time) == 13):
        return False
    if not (time[-4:] == "a.m." or time[-4:] == "p.m."):
        return False
    
    components = time.split(':')
    if not len(components) == 3:
        return False
    
    try:
        hour = int(components[0])
        minute = int(components[1])
        second = int(components[2][:2])

        if hour < 1 or hour > 12:
            return False
        if minute < 0 or minute > 59:
            return False
        if second < 0 or second > 59:
            return False
    except ValueError:
        return False
    
    return True
        
class GuestBookEntryViewSet(ModelViewSet):
    queryset = GuestBookEntry.objects.all()
    serializer_class = GuestBookEntrySerializer

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        request_data = request.data
        user_uuid = request_data.get("user_uuid")
        ip = request_data.get("ip")
        name = request_data.get("name")
        message = request_data.get("message")
        date = request_data.get("date")
        time = request_data.get("time")

        # Validate request
        if not is_valid_ip(ip):
            return Response({"Error": "invalid ip"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        if not is_valid_date(date):
            return Response({"Error": "invalid date"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        if not is_valid_time(time):
            return Response({"Error": "invalid time"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        if GuestBookEntry.objects.filter(ip=ip).count() >= 5:
            return Response({"Error": "too many entries from this IP address"}, status=status.HTTP_429_TOO_MANY_REQUESTS)
        if GuestBookEntry.objects.filter(user_uuid=user_uuid).count() >= 5:
            return Response({"Error": "too many entries from this render"}, status=status.HTTP_429_TOO_MANY_REQUESTS)
        if len(name) == 0:
            request.data.update({"name": "Anonymous Fan"})
        if len(message) == 0:
            request.data.update({"message": "I forgot to write a message!"})

        return super().create(request, *args, **kwargs)
    
## An example of a view set that includes only songs without tabs
# class FilteredSongViewSet(ModelViewSet):
#     queryset = Song.objects.exclude(tab_file_name='')
#     serializer_class = SongSerializer
    
