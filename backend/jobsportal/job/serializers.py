from rest_framework import serializers
from .models import Job, JobCandidate

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'email', 'address', 'jobType',
                    'education', 'industry', 'experience', 'salary', 'positions',
                    'company', 'lng', 'lat', 'lastDate', 'createdAt']
        read_only_fields = ['id']

class JobCandidateSerializer(serializers.ModelSerializer):
    job = JobSerializer()
    class Meta:
        model = JobCandidate
        fields = ['id', 'user', 'resume', 'appliedAt', 'job']
        read_only_fields = ['id']

class JobStatsSerializer(serializers.Serializer):
    jobs_count = serializers.IntegerField()
    positions_avg = serializers.IntegerField()
    alary_avg = serializers.IntegerField()
    salary_max = serializers.IntegerField()
    salary_min = serializers.IntegerField()