from rest_framework.serializers import ModelSerializer
from ..models import Album
from ..models import Song

class AlbumSerializer(ModelSerializer):
    class Meta:
        model = Album
        fields = ('id', 'name', 'display_name', 'path', 'downloadable_artwork')

class SongSerializer(ModelSerializer):
    class Meta:
        model = Song
        fields = ('name', 'album', 'track_number', 'song_id', 'audio_file_name', 'tab_file_name', 'lyric_sheet_file_name')