FROM python:3.8-buster

RUN sudo apt install npm
RUN pip install virtualenv
RUN python -m venv env
RUN source env/bin/activate
RUN pip install -r requirements.txt
RUN python manage.py migrate
RUN npm install
EXPOSE 7501
RUN npm start & python manage.py runserver 0:7501
