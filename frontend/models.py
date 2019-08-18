from django.contrib.auth.models import User
from django.db import models
from uuslug import uuslug


class Album(models.Model):
    cover = models.ImageField(
        blank=True,
        null=True,
        upload_to='music/'
    )
    name = models.CharField(max_length=255)
    slug = models.SlugField(blank=True, max_length=255, unique=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = uuslug(self.name, instance=self)

        super(Album, self).save(*args, **kwargs)
    
    class Meta:
        ordering = ['name']


class Artist(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Song(models.Model):
    album = models.ForeignKey(
        'Album',
        blank=True,
        on_delete=models.CASCADE,
        null=True,
        related_name='songs',
        related_query_name='song'
    )
    album_order = models.PositiveIntegerField(blank=True, default=0)
    artists = models.ManyToManyField(
        'Artist',
        related_name='songs',
        related_query_name='song'
    )
    file = models.FileField(upload_to='music/')
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    def create_name_from_file(self):
        self.name = ".".join(self.file.name.split(".")[:-1])

    class Meta:
        ordering = ['album_order']
