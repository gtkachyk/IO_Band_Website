from django.db import models

class Album(models.Model):
    name = models.CharField(max_length=45, primary_key=True)                                                # the name, formatted for data management
    display_name = models.CharField(max_length=45)                                                          # the name, formatted for display
    downloadable_artwork = models.CharField(max_length=512, default = "")                                   # images that can download from the album page

    def save(self, *args, **kwargs):
        if not self.name:
            self.name = self.display_name.lower().replace(" ", "_")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"
    
class Song(models.Model):
    name = models.CharField(max_length=65)                                                                  # the name, formatted for display
    album = models.ForeignKey(Album, on_delete=models.CASCADE)                                              # the album this song belongs to
    track_number = models.IntegerField(unique = False)                                                      # the track number of the song in its album
    song_id = models.CharField(max_length=48, editable=False, primary_key=True)                             # the song identifier, format: album.name/song.name
    audio_file_name = models.CharField(max_length=65)                                                       # the song's audio file
    tab_file_name = models.CharField(max_length = 65, null = False, blank = True, default = "")             # the song's tab
    lyric_sheet_file_name = models.CharField(max_length = 65, null = False, blank = True, default = "")     # the song's lyrics

    def save(self, *args, **kwargs):
        # Check if song_id is not set, then set its value based on album_id and track_number
        if not self.song_id:
            self.song_id = str(self.album.name) + "/" + str(self.track_number)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"song: {self.name}"
    
class GuestBookEntry(models.Model):
    user_uuid = models.UUIDField(null=True)                                                                 # used to prevent excessive requests from the same page render
    ip = models.CharField(max_length=20, default="")                                                        # used to prevent excessive requests from the same public ip
    name = models.CharField(max_length=50)                                                                  # the name of the user who posted the message
    message = models.CharField(max_length=400)                                                              # the body of the entry
    date = models.CharField(max_length=10)                                                                  # the date at which the entry was made
    time = models.CharField(max_length=13, default="")                                                      # the time at which the entry was made
    