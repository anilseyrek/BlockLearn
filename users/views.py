from django.http import HttpResponse
from django.shortcuts import render  # noqa
from rest_framework import viewsets, permissions
from .models import User
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from .token_generator import account_activation_token

# Create your views here.

def activate_account(request, uidb64, token):
    try:
        uid = force_bytes(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        # login(request, user)
        current_site = get_current_site(request)
        return render(request, 'activate_account_success.html',  {
            'domain': current_site.domain,
        }) # HttpResponse('Your account has been activate successfully')
    else:
        return HttpResponse('Activation link is invalid!')
