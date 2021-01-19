# React-Django app
Simple setup for a React-Django web app. See tutorial here: https://alphacoder.xyz/dead-simple-react-django-setup.

## Setup
- Download/clone repo.
- Windows users must follow below, non-windows users can either follow below or run `setup.sh`
- Install python3
- - (Windows) https://www.python.org/downloads/windows/
- Install npm
- - (Windows) https://nodejs.org/en/download/
- - (Mac) https://nodejs.org/en/download/ OR https://treehouse.github.io/installation-guides/mac/node-mac.html
- - (Unix) `sudo apt install npm`
- Navigate to cloned repo in shell
- Create a virtual environment.
- - `pip install virtualenv`
- - `python -m venv env`
- Activate virtualenv
- - (Windows) `.\env\Scripts\activate`
- - (Other) `source env/bin/activate`
- Install Django and other dependencies with `pip install -r requirements.txt`.
- Run Django migrations using `python manage.py migrate`
- Install React dependencies with `npm install`.

## Run
- Run server using `npm start & python manage.py runserver 0:7501`.
- Go to page in browser at `localhost:7501`, and then modify code as desired!
