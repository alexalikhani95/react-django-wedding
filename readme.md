Spin up virtual environment - 
- python3 -m venv venv
- source venv/bin/activate

install python packages in venv - pip install -r requirements.txt

when in virtual env - cd backend and pip install -r backend/requirements.txt to install py packages

python manage.py runserver - run server

testing -
python manage.py test - run all tests
test coverage - coverage run manage.py test and then run coverage report -m for report


psql postgres - Enter postgres shell connected to default database
- \q - quit postgres shell