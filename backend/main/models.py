from django.db import models

class Album(models.Model):
    id = models.IntegerField(primary_key = True)
    name = models.CharField(max_length=45)
    path = models.CharField(max_length=256)
    downloadable_artwork = models.CharField(max_length=512, default = "")

    def __str__(self):
        return f"{self.name}"
    
class Song(models.Model):
    name = models.CharField(max_length=65)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    track_number = models.IntegerField(unique = False)
    song_id = models.CharField(max_length=4, editable=False, primary_key=True)
    audio_file_name = models.CharField(max_length=65)
    tab_file_name = models.CharField(max_length = 65, null = False, blank = True, default = "")
    lyric_sheet_file_name = models.CharField(max_length = 65, null = False, blank = True, default = "")

    def save(self, *args, **kwargs):
        # Check if song_id is not set, then set its value based on album_id and track_number
        if not self.song_id:
            self.song_id = str(self.album.id) + "," + str(self.track_number)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"song: {self.name}"
    