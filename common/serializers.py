from rest_framework import serializers

from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'course_URL', 'course_name', 'course_code', 'total_progress_number', )
