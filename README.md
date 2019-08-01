### BlockLearn

### Setup
- On project root, do the following:
- Create a copy of ``BlockLearn/settings/local.py.example``:  
  `cp BlockLearn/settings/local.py.example BlockLearn/settings/local.py`
- Create a copy of ``.env.example``:  
  `cp .env.example .env`

### Tools
- Setup [editorconfig](http://editorconfig.org/), [prospector](https://prospector.landscape.io/en/master/) and [ESLint](http://eslint.org/) in the text editor you will use to develop.

### Running the project
- Open a command line window and go to the project's directory.
- `npm install`
- If any error occurs, try with deleting `package-lock.json` file.
- `npm run start`
- Open another command line window and go to the project's directory.
- `PIP_NO_CACHE_DIR=off pipenv shell`
- `PIP_NO_CACHE_DIR=off pipenv install --dev`
- `PIP_NO_CACHE_DIR=off pipenv install djangorestframework`
- `PIP_NO_CACHE_DIR=off pipenv install django-rest-knox`
- Run the migrations:  
  `python manage.py migrate`
- `python manage.py runserver`

#### Celery
- Open a command line window and go to the project's directory
- `pipenv shell`
- `python manage.py celery`

### Testing
`make test`

Will run django tests using `--keepdb` and `--parallel`. You may pass a path to the desired test module in the make command. E.g.:

`make test someapp.tests.test_views`

### Adding new pypi libs
Just run `pipenv install LIB_NAME_ON_PYPI` and then `pipenv lock` to lock the version in Pipfile.lock file

## Linting
- Manually with `prospector` and `npm run lint` on project root.
- During development with an editor compatible with prospector and ESLint.

## Pre-commit hooks
- Run `pre-commit install` to enable the hook into your git repo. The hook will run automatically for each commit.
- Run `git commit -m "Your message" -n` to skip the hook if you need.
