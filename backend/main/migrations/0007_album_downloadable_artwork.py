# Generated by Django 5.0.1 on 2024-01-28 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_rename_file_name_song_audio_file_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='downloadable_artwork',
            field=models.CharField(default='', max_length=512),
        ),
    ]
