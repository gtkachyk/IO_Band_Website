# Generated by Django 5.0.1 on 2024-04-05 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_album_background_image_album_preview_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='background_image',
            field=models.CharField(default='', max_length=256),
        ),
        migrations.AlterField(
            model_name='album',
            name='preview_image',
            field=models.CharField(default='', max_length=256),
        ),
    ]
