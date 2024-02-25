from rest_framework.viewsets import ModelViewSet
from ..models import Song
from.serializers import SongSerializer

class SongViewSet(ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer