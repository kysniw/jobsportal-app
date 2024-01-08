from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('', views.JobViewSet, basename='jobs_view')

urlpatterns = [
    path('', include(router.urls)),
    path('stats/<str:topic>/', views.GetJobsStats.as_view(), name='jobs_stats')
]