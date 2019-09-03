from django.contrib.auth.models import User #AbstractBaseUser, PermissionsMixin
from django.db import models
from django.db.models.signals import post_save
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

class UserProfile(models.Model):
    """
    Class to define external properties of a user.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birth_date = models.DateField(null=True)


    def __str__(self):
        return self.user.__str__()


def create_user_profile(sender, instance, created, **kwargs):
    """
    Signal listener for User model. Triggers after a user is created.
    """
    if created:
        UserProfile.objects.create(user=instance)

# Connects the signal listener to the user.
post_save.connect(create_user_profile, sender=User)

class Progress(models.Model):
    course_URL = models.CharField(max_length=255, default="/static/courses/blockchain.html")
    course_name = models.CharField(max_length=255, default="Blockchain 101")
    course_code = models.CharField(max_length=255, default="BC-101")
    progress_number = models.CharField(max_length=255, default="0")
    owner = models.ForeignKey(User, related_name="progress",
                              on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.progress
