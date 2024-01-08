from django.db.models import Avg, Min, Max, Count

from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .serializers import JobSerializer, JobStatsSerializer
from .models import Job
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


class GetJobsStats(generics.RetrieveAPIView):
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