from django.urls import path
from .views import RegisterUserView, ProfileView, UserResumeView

urlpatterns = [
    path('', RegisterUserView.as_view(), name='register'),
    path('me/', ProfileView.as_view(), name='me'),
    path('me/resume', UserResumeView.as_view(), name='resume'),
]
