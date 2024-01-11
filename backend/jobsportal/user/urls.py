from django.urls import path
from . import views

urlpatterns = [
    path('', views.RegisterUserView.as_view(), name='register'),
    path('me/', views.ProfileView.as_view(), name='me'),
    path('me/resume', views.UserResumeView.as_view(), name='my_resume'),
    path('me/applies', views.UserAppliesView.as_view(), name='my_applies'),
    path('me/jobs', views.UserJobsView.as_view(), name='my_jobs')
]
