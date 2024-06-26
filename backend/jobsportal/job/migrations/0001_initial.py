# Generated by Django 5.0.1 on 2024-02-21 17:22

import django.core.validators
import django.db.models.deletion
import job.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, null=True)),
                ('description', models.TextField(null=True)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('address', models.CharField(max_length=100, null=True)),
                ('jobType', models.CharField(choices=[('Permanent', 'Permanent'), ('Temporary', 'Temporary'), ('Intership', 'Intership')], default='Permanent')),
                ('education', models.CharField(choices=[('Bachelors', 'Bachelors'), ('Masters', 'Masters'), ('Phd', 'Phd')], default='Phd')),
                ('industry', models.CharField(choices=[('Business', 'Business'), ('Information Technology', 'It'), ('Banking', 'Banking'), ('Education/Training', 'Education'), ('Telecomunication', 'Telecomunication'), ('Others', 'Others')], default='Information Technology')),
                ('experience', models.CharField(choices=[('No experience', 'No Experience'), ('1 year', 'One Year'), ('2 years', 'Two Years'), ('3 years plus', 'Three Years Plus')], default='No experience')),
                ('salary', models.IntegerField(default=10, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(1000000)])),
                ('positions', models.IntegerField(default=1)),
                ('company', models.CharField(max_length=100, null=True)),
                ('lat', models.FloatField(default=0.0)),
                ('lng', models.FloatField(default=0.0)),
                ('lastDate', models.DateTimeField(default=job.models.last_date)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='JobCandidate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resume', models.CharField(max_length=200)),
                ('appliedAt', models.DateTimeField(auto_now_add=True)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='job.job')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
