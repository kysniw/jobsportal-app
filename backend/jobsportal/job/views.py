from django.db.models import Avg, Min, Max, Count
from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .serializers import JobSerializer, JobStatsSerializer, JobCandidateSerializer
from .models import Job, JobCandidate
from .filters import JobsFilter
from .permissions import IsOwnerOrReadOnly

# Create your views here.

class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Job.objects.all()


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def list(self, request, *args, **kwargs):
        filterset = JobsFilter(request.GET, queryset=Job.objects.all().order_by('id'))

        responses_count = filterset.qs.count()

        pagination = PageNumberPagination()
        pagination.page_size = 3

        queryset = pagination.paginate_queryset(filterset.qs, request=request)

        serializer = self.get_serializer(filterset.qs, many=True)
        return Response({
            'count': responses_count,
            'page_size': 3,
            'jobs': serializer.data
        })


class JobsStatsView(generics.RetrieveAPIView):
    serializer_class = JobStatsSerializer

    def get(self, request, topic):
        args = { 'title__icontains': topic }
        jobs = Job.objects.filter(**args)

        if len(jobs) == 0:
            return Response({'message': f'No stats for {topic}'})

        stats = jobs.aggregate(
            jobs_count = Count('title'),
            positions_avg = Avg('positions'),
            salary_avg = Avg('salary'),
            salary_max = Max('salary'),
            salary_min = Min('salary')
        )

        return Response(stats)


class JobCandidateView(generics.ListCreateAPIView):
    serializer_class = JobCandidateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        job = get_object_or_404(Job, id=pk)
        user = self.request.user

        if user.userresume.resume == '':
            return Response({'error': "You can't apply without resume!"},
                            status=status.HTTP_400_BAD_REQUEST)

        if job.lastDate < timezone.now():
            return Response({'error': "This job offer is out of date."},
                            status=status.HTTP_400_BAD_REQUEST)

        is_current_candidate = job.jobcandidate_set.filter(user=user).exists()

        if is_current_candidate:
            return Response({'error': "You have been applied to this job."},
                            status=status.HTTP_400_BAD_REQUEST)

        candidate = JobCandidate.objects.create(job=job, user=user,
                                                resume=user.userresume.resume)

        return Response({'is_candidate': True, 'job_candidate_id': candidate.id},
                        status=status.HTTP_201_CREATED)

    def list(self, request, pk):
        job = get_object_or_404(Job, id=pk)
        user = self.request.user

        if job.user != user:
            return Response({'error', 'Sorry but this is not your job offer.'})

        candidates_list = job.jobcandidate_set.all()
        serializer = self.serializer_class(candidates_list, many=True)

        return Response(serializer.data)


class JobCandidateCheckUserView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, pk):
        job = get_object_or_404(Job, id=pk)

        is_candidate = job.jobcandidate_set.filter(user=self.request.user).exists()

        return Response(is_candidate)