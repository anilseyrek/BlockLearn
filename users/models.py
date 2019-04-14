from django.contrib.auth.models import User #AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import ugettext_lazy as _

from common.models import IndexedTimeStampedModel

#from .managers import UserManager

'''
class User(AbstractBaseUser, PermissionsMixin, IndexedTimeStampedModel):
    email = models.EmailField(max_length=255, unique=True)
    is_staff = models.BooleanField(
        default=False,
        help_text=_('Designates whether the user can log into this admin '
                    'site.'))
    is_active = models.BooleanField(
        default=True,
        help_text=_('Designates whether this user should be treated as '
                    'active. Unselect this instead of deleting accounts.'))

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def __str__(self):
        return self.email
        '''

class Progress(models.Model):
    course_URL = models.CharField(max_length=255, default="/static/courses/blockchain.html")
    course_name = models.CharField(max_length=255, default="Blockchain 101")
    course_code = models.CharField(max_length=255, default="BC-101")
    progress = models.CharField(max_length=255, default="0")
    owner = models.ForeignKey(User, related_name="progress",
                              on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.progress
