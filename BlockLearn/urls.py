from django.conf import settings
from django.conf.urls import include, url  # noqa
from django.contrib import admin
from django.views.generic import TemplateView, RedirectView
from users import endpoints
from users.views import CourseViewSet
from rest_framework import routers

import django_js_reverse.views

router = routers.DefaultRouter()
router.register('courses', CourseViewSet, 'courses')


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', django_js_reverse.views.urls_js, name='js_reverse'),
    url(r'^api/', include(endpoints)),
    url(r'^api/auth/', include('knox.urls')),

    url(r'^favicon\.ico$', RedirectView.as_view(url='/static/favicon.ico')),
    #url(r'^courseContent/blockchain$', RedirectView.as_view(url='/static/courses/blockchain.html', permanent=True), name='blockchain'),
    #url(r'^courseContent/blockchain$', views.CourseView),
    url(r'^cour/blockchain$', TemplateView.as_view(template_name='exampleapp/course.html'), name='blockchain'),

    url(r'^$', TemplateView.as_view(template_name='exampleapp/itworks.html'), name='home'),
    url(r'^(?:.*)/?$', TemplateView.as_view(template_name='exampleapp/itworks.html'), name='home'),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
