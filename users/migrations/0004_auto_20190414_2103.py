# Generated by Django 2.2 on 2019-04-14 21:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20190414_1624'),
    ]

    operations = [
        migrations.RenameField(
            model_name='progress',
            old_name='progress',
            new_name='progress_number',
        ),
    ]
