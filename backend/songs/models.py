from django.db import models

class Song(models.Model):
    album_id = models.IntegerField(unique = False)
    track_number = models.IntegerField(unique = False)
    name = models.CharField(max_length=200)
    path = models.CharField(max_length=256)
    song_id = models.CharField(max_length=4, editable=False, primary_key=True)
    album_player_html = models.CharField(max_length=650)

    def save(self, *args, **kwargs):
        # Check if song_id is not set, then set its value based on album_id and track_number
        if not self.song_id:
            self.song_id = str(self.album_id) + str(self.track_number)
        if not self.album_player_html:
            self.album_player_html = "<div className= \"play-list-row\" data-track-row=\"" + self.track_number + "\"><div className=\"small-toggle-btn\"><i className=\"small-play-btn\"><span className=\"screen-reader-text\">Small toggle button</span></i></div><div className=\"track-number\">" + self.track_number + ". " + "</div><div className=\"track-title\"><a className=\"playlist-track\" href=\"#\" data-play-track=" + self.track_number + " style=\"pointer-events: none\">" + self.name + "</a></div></div>"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"song: {self.name}"
    