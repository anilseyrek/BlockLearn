from django.conf import settings
from django.conf.urls import include, url  # noqa
from django.contrib import admin
from django.views.generic import TemplateView
from .models import User
#from users.urls import users_urls

import django_js_reverse.views


urlpatterns = [
    #url(r'^progress/', admin.site.urls),

    url(r'^$', TemplateView.as_view(template_name='exampleapp/itworks.html'), name='home'),
]
