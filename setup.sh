#!/bin/bash

if [[ "$OSTYPE" == "darwin"* ]]; then
	brew install node
else
	sudo apt install npm
fi

pip3 install virtualenv
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
python3 manage.py migrate
npm install
