from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save


class UserResume(models.Model):
    user = models.OneToOneField(User, related_name='userresume', on_delete=models.CASCADE)
    resume = models.FileField(null=True, upload_to='resumes')

@receiver(post_save, sender=User)
def save_resume(sender, instance, created, **kwargs):

    print(instance)
    user = instance

    if created:
        user_resume = UserResume(user=user)
        user_resume.save()