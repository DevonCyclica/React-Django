FROM python:3.8-buster

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get -y install nodejs
WORKDIR /opt/app
EXPOSE 7501
CMD ["/bin/bash"]
