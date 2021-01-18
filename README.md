# React-Django app
Simple setup for a React-Django web app. See tutorial here: https://alphacoder.xyz/dead-simple-react-django-setup.

## Setup
- Download/clone repo.
- Create and activate a virtual environment.
- - `pip install virtyualenv`
- - `python3 -m venv env`
- Activate virtualenv
- - (Windows) `.\env\Scripts\activate`
- - (Other) `source env/bin/activate`
- Install Django and other dependencies with `pip install -r requirements.txt`.
- Run Django migrations using `python manage.py migrate`
- Install React dependencies with `npm install`.
- Run server using `npm start & python manage.py runserver 0:7501`.
- Go to page in browser at `localhost:7501`, and then modify code as desired!

## Deploy
Read my tutorial on deploying this app to Heroku here: https://alphacoder.xyz/deploy-react-django-app-on-heroku.
