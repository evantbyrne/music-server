from django.contrib import admin
from . import models

class AlbumAdmin(admin.ModelAdmin):
    pass

class ArtistAdmin(admin.ModelAdmin):
    pass

class SongAdmin(admin.ModelAdmin):
    pass

admin.site.register(models.Album, AlbumAdmin)
admin.site.register(models.Artist, ArtistAdmin)
admin.site.register(models.Song, SongAdmin)
