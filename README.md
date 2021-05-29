Setup Instructions

Backend

- Open a new terminal
- Create and activate a new virtual environment (optional)
- Run `pip3 install -r req.txt`
- Go to backend root folder
- Run `python manage.py migrate`
- Run `python manage.py createsuperuser` // Choose username and password
- Add tokenizer and model_2.h5 file inside `dl` directory
- Run `python manage.py runserver`

Frontend

- Open a new terminal
- sudo apt update
- sudo apt install nodejs
- sudo apt install npm
- Run `nodejs -v` // to check if nodejs successfully installed
- Go to frontend root folder
- Run `npm i`
- Run `npm start`
