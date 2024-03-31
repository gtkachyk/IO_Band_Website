from django.contrib import admin
from.models import Album
from.models import Song
from.models import GuestBookEntry

# Register your models here.
admin.site.register(Album)
admin.site.register(Song)
admin.site.register(GuestBookEntry)
