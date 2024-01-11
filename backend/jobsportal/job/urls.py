from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('', views.JobViewSet, basename='jobs_view')

urlpatterns = [
    path('', include(router.urls)),
    path('stats/<str:topic>/', views.JobsStatsView.as_view(), name='jobs_stats'),
    path('<str:pk>/candidate/', views.JobCandidateView.as_view(), name='jobs_set_candidate'),
    path('<str:pk>/check/', views.JobCandidateCheckUserView.as_view(), name='jobs_check_candidate')
]