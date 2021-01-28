# React-Django app
Simple setup for a React-Django web app. See tutorial here: https://alphacoder.xyz/dead-simple-react-django-setup.

## Setup
- Download/clone repo.
- Download/install Docker https://docs.docker.com/docker-for-windows/install/

## Run
- run the docker container: `$ docker run -it --volume path/to/repo:/opt/app -p 7501:7501 cyclica/interview`
- from within the container shell:
```
$ chmod +x setup.sh
$ ./setup.sh
$ chmod +x runserver
$ ./runserver
```

