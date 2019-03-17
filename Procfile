web: gunicorn BlockLearn.wsgi --limit-request-line 8188 --log-file -
worker: celery worker --app=BlockLearn --loglevel=info
