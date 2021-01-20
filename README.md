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
- - `pip3 install virtualenv`
- - `python3 -m venv env`
- Activate virtualenv
- - (Windows) `.\env\Scripts\activate`
- - (Other) `source env/bin/activate`
- Install Django and other dependencies with `pip3 install -r requirements.txt`.
- Run Django migrations using `python3 manage.py migrate`
- Install React dependencies with `npm install`.

## Alternative Setup for Windows:
- Download/clone repo.
- Download/install Docker.
- In a shell, navigate to repo
- Build docker container `docker build -t test_repo .`

## Run
- Run server:
- - (Normally) `npm start & python3 manage.py runserver 0:7501`.
- - (Using docker method for windows) 
- - - (using native shell) `docker run -it -p 7501:7501 -v "%cd%"\src:/opt/app/src -v "%cd%"\sampleapp:/opt/app/sampleapp test_repo`
- - - (using unix style shell [might be able to omit 'winpty' from some, but this works on git bash]) `winpty docker run -it -p 7501:7501 -v "$(pwd)"/src:/opt/app/src -v "$(pwd)"/sampleapp:/opt/app/sampleapp test_repo`
- Go to page in browser at `localhost:7501`, and then modify code as desired!
