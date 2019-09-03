from django.test import TestCase, Client
from django.contrib.auth.models import User
from users.models import UserProfile

class UserProfileTestCase(TestCase):

    def setUp(self):
        pass
    
    def test_user_profile_is_created_whenever_a_user_is_created(self):
        user = User.objects.create_user(username="wow")
        profile = UserProfile.objects.get(user=user)
        self.assertIsNotNone(profile)
    
    def test_user_profile_is_deleted_whenever_a_user_is_deleted(self):
        user = User.objects.create_user(username="wow")
        uid = user.id
        user.delete()
        profiles = UserProfile.objects.filter(user__id=uid)
        self.assertEqual(0, profiles.count())
    