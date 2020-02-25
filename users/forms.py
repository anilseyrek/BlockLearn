from django.contrib.auth.forms import SetPasswordForm

class FormSetPassword(SetPasswordForm):
    """Overridden forms for changing class of input fields """
    def __init__(self, *args, **kwargs):
        super(FormSetPassword, self).__init__(*args, **kwargs)
        for field in ('new_password1', 'new_password2'):
            self.fields[field].widget.attrs = {'class': 'au-input au-input--full'}
