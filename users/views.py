from django.shortcuts import render  # noqa
from rest_framework import viewsets, permissions

# Create your views here.

class CourseViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    def get(self):
        return render('/static/courses/blockchain.html')
