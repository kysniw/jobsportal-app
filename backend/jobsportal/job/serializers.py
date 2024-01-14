from rest_framework import serializers
from .models import Job, JobCandidate

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'email', 'address', 'job_type',
                    'education', 'industry', 'experience', 'salary', 'positions',
                    'company', 'point', 'last_date', 'created_at']
        read_only_fields = ['id']

class JobCandidateSerializer(serializers.ModelSerializer):
    job = JobSerializer()
    class Meta:
        model = JobCandidate
        fields = ['id', 'user', 'resume', 'applied_at', 'job']
        read_only_fields = ['id']

class JobStatsSerializer(serializers.Serializer):
    jobs_count = serializers.IntegerField()
    positions_avg = serializers.IntegerField()
    alary_avg = serializers.IntegerField()
    salary_max = serializers.IntegerField()
    salary_min = serializers.IntegerField()