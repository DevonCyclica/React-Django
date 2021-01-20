FROM python:3.8-buster

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get -y install nodejs
COPY requirements.txt /opt/app/requirements.txt
WORKDIR /opt/app
RUN pip install -r /opt/app/requirements.txt
COPY . /opt/app
RUN python manage.py migrate
RUN npm install
EXPOSE 7501
CMD npm start & python /opt/app/manage.py runserver 0:7501
