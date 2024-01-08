from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'email', 'address', 'job_type',
                    'education', 'industry', 'experience', 'salary', 'positions',
                    'company', 'point', 'lastDate', 'createdAt']
        read_only_fields = ['id']


class JobStatsSerializer(serializers.Serializer):
    jobs_count = serializers.IntegerField()
    positions_avg = serializers.IntegerField()
    alary_avg = serializers.IntegerField()
    salary_max = serializers.IntegerField()
    salary_min = serializers.IntegerField()