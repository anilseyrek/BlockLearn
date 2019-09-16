from django.db import models
from django.utils.translation import ugettext_lazy as _

from model_utils.fields import AutoCreatedField, AutoLastModifiedField


class IndexedTimeStampedModel(models.Model):
    created = AutoCreatedField(_('created'), db_index=True)
    modified = AutoLastModifiedField(_('modified'), db_index=True)

    class Meta:
        abstract = True

class Course(models.Model):
    course_URL = models.CharField(max_length=255, default="")
    course_name = models.CharField(max_length=255, default="")
    course_code = models.CharField(max_length=255, default="")
    total_progress_number = models.CharField(max_length=255, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.course_code
