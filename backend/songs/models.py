from django.db import models

class Song(models.Model):
    album_id = models.IntegerField(unique = False)
    track_number = models.IntegerField(unique = False)
    name = models.CharField(max_length=200)
    path = models.CharField(max_length=256)
    song_id = models.CharField(max_length=4, editable=False, primary_key=True)

    def save(self, *args, **kwargs):
        # Check if song_id is not set, then set its value based on album_id and track_number
        if not self.song_id:
            self.song_id = str(self.album_id) + str(self.track_number)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"song: {self.name}"
    