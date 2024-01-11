from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

from rest_framework.viewsets import generics
from rest_framework.response import Response
from rest_framework import status, parsers, renderers
from .serializers import UserSerializer, UserResumeSerializer
from .validators import validate_resume_file
from job.serializers import JobCandidateSerializer, JobSerializer
from job.models import JobCandidate, Job

from drf_spectacular.utils import extend_schema
# Create your views here.


class RegisterUserView(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class UserResumeView(generics.UpdateAPIView):
    serializer_class = UserResumeSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (parsers.MultiPartParser,)
    renderer_classes = (renderers.JSONRenderer,)


    @extend_schema(
        operation_id='upload_file',
        request={
            'multipart/form-data': {
                'type': 'object',
                'properties': {
                    'resume': {
                        'type': 'string',
                        'format': 'binary'
                        }
                    }
                }
            },
        )
    def put(self, request):
        resume = self.get_object()
        serializer = self.get_serializer(resume, data=request.data)
        if serializer.is_valid(raise_exception=True):
            filename = request.FILES['resume'].name
            if validate_resume_file(filename=filename):
                serializer.save(user = self.request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({'error': 'You have to upload file with .pdf extension!'},
                            status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self):
        if self.request.user.userresume:
            return self.request.user.userresume
        return Response({'message': 'First upload your resume'})

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)


class UserAppliesView(generics.ListAPIView):
    serializer_class = JobCandidateSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        my_applies = JobCandidate.objects.filter(user=self.request.user)
        serializer = self.serializer_class(my_applies, many=True)

        return Response(serializer.data)


class UserJobsView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):

        my_jobs = Job.objects.filter(user=self.request.user)
        serializer = self.serializer_class(my_jobs, many=True)

        return Response(serializer.data)