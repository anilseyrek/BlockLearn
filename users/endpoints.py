from django.conf.urls import include, url
from rest_framework import routers

from .api import ProgressViewSet, RegistrationAPI, UserAPI, LoginAPI

router = routers.DefaultRouter()
router.register('progress', ProgressViewSet, 'progress')

urlpatterns = [
    url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
    ]
