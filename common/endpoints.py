from django.conf.urls import include, url
from rest_framework import routers

from .api import CourseViewSet

router = routers.DefaultRouter()
router.register('list', CourseViewSet, 'list')

urlpatterns = [
    url("^", include(router.urls)),
    ]
