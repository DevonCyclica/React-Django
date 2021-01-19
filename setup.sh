#!/bin/bash

if [[ "$OSTYPE" == "darwin"* ]]; then
	brew install node
else
	sudo apt install npm
fi

pip install virtualenv
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
npm install
