from rest_framework.serializers import ModelSerializer
from ..models import Song

class SongSerializer(ModelSerializer):
    class Meta:
        model = Song
        fields = ('album_id', 'track_number', 'name', 'path', 'song_id')