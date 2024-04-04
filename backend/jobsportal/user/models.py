import os
import uuid

from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save

def resume_file_path(instance, filename):

    ext = os.path.splitext(filename)[1]
    filename = f'{uuid.uuid4()}{ext}'

    return os.path.join('resumes', filename)

class UserResume(models.Model):
    user = models.OneToOneField(User, related_name='userresume', on_delete=models.CASCADE)
    resume = models.FileField(null=True, upload_to=resume_file_path)

@receiver(post_save, sender=User)
def save_resume(sender, instance, created, **kwargs):

    print(instance)
    user = instance

    if created:
        user_resume = UserResume(user=user)
        user_resume.save()