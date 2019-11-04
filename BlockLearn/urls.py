from django.conf import settings
from django.conf.urls import include, url  # noqa
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView, RedirectView
from django.contrib.auth import views as auth_views
from users import endpoints, views
from common import endpoints as commonEndpoints

import django_js_reverse.views


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', django_js_reverse.views.urls_js, name='js_reverse'),
    url(r'^api/', include(endpoints)),
    url(r'^courses/', include(commonEndpoints)),
    url(r'^api/auth/', include('knox.urls')),
    url(r'^favicon\.ico$', RedirectView.as_view(url='/static/favicon.ico')),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate_account, name='activate'),
    url(r'^password_reset/$', auth_views.PasswordResetView.as_view(
            template_name='registration/password_reset_form.html',
            html_email_template_name="registration/password_reset_html_email.html",
            email_template_name='registration/password_reset_email.html',
            subject_template_name="registration/password_reset_subject.txt",
            ), name='password_reset'),
    url(r'^password_reset/done/$', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    url(r'^reset/done/$', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),


    url(r'^$', TemplateView.as_view(template_name='exampleapp/itworks.html'), name='home'),
    url(r'^(?:.*)/?$', TemplateView.as_view(template_name='exampleapp/itworks.html'), name='home'),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
else:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
