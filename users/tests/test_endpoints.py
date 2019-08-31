from django.test import TestCase, Client

class LoginEndpointTestCase(TestCase):

    def setUp(self):
        pass
    
    def test_get_login_returns_200(self):
        c = Client()
        response = c.get('/login/')
        self.assertEqual(200, response.status_code)
    
    # TODO more cases...