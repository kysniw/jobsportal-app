# Generated by Django 5.0.1 on 2024-01-06 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='resume',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]
