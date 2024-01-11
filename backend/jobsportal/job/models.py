from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User
from django.contrib.gis.db import models as gis_models
from django.contrib.gis.geos import Point

import requests
import os

from datetime import timedelta, datetime

# Create your models here.

class JobType(models.TextChoices):
    PERMANENT = 'Permanent'
    TEMPORARY = 'Temporary'
    INTERSHIP = 'Intership'

class Education(models.TextChoices):
    BACHELORS = 'Bachelors'
    MASTERS = 'Masters'
    PHD = 'Phd'

class Industry(models.TextChoices):
    BUSINESS = 'business'
    IT = 'Information Technology'
    BANKING = 'Banking'
    EDUCATION = 'Education/Training'
    TELECOMUNICATION = 'Telecomunication'
    OTHERS = 'Others'

class Experience(models.TextChoices):
    NO_EXPERIENCE = 'No experience'
    ONE_YEAR = '1 year'
    TWO_YEARS = '2 years'
    THREE_YEARS_PLUS = '3 years plus'

def last_date():
    now = datetime.now()
    return now + timedelta(days=10)

class Job(models.Model):
    title = models.CharField(max_length=200, null=True)
    description = models.TextField(null=True)
    email = models.EmailField(null=True)
    address = models.CharField(max_length=100, null=True)
    job_type = models.CharField(
        choices=JobType.choices,
        default=JobType.PERMANENT
    )
    education = models.CharField(
        choices=Education.choices,
        default=Education.PHD
    )
    industry = models.CharField(
        choices=Industry.choices,
        default=Industry.IT
    )
    experience = models.CharField(
        choices=Experience.choices,
        default=Experience.NO_EXPERIENCE
    )
    salary = models.IntegerField(default=10, validators=[
        MinValueValidator(1),
        MaxValueValidator(1000000)
    ])
    positions = models.IntegerField(default=1)
    company = models.CharField(max_length=100, null=True)
    point = gis_models.PointField(default=Point(0.0, 0.0))
    lastDate = models.DateTimeField(default=last_date)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        url = 'https://geocode.search.hereapi.com/v1/geocode'
        params = {'q': self.address, 'apiKey': os.environ.get('HERE_API_KEY')}
        req = requests.get(url=url, params=params)
        items = req.json()['items']
        position = items[0].get('position')
        lng = position.get('lng')
        lat = position.get('lat')
        self.point = Point(lng, lat)
        super(Job, self).save(*args, **kwargs)

class JobCandidate(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    resume = models.CharField(max_length=200)
    applied_at = models.DateTimeField(auto_now_add=True)