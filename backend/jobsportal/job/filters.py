from django_filters import rest_framework as filters
from .models import Job


class JobsFilter(filters.FilterSet):

    keyword = filters.CharFilter(field_name='title', lookup_expr='icontains')
    location = filters.CharFilter(field_name='address', lookup_expr='icontains')
    minSalary = filters.NumberFilter(field_name='salary' or 0, lookup_expr='gte')
    maxSalary = filters.NumberFilter(field_name='salary' or 1000000, lookup_expr='lte')

    class Meta:
        model = Job
        fields = ['jobType', 'education', 'industry', 'experience', 'minSalary', 'maxSalary',
                  'keyword', 'location']