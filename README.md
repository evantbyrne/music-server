# Music Server

Self-hosted music streaming service.


## Deploy To Heroku

- Fork repository on Github.
- Create app via the Heroku dashboard.
- Select Github as deployment method, select your fork.
- Manually deploy the master branch.
- Add a Heroku Postgres database via the Add-ons interface.
- Run migrations via Heroku CLI: `heroku run "python manage.py migrate" --app=APP_NAME`
- Create admin user: `heroku run "python manage.py createsuperuser" --app=APP_NAME`


## Run Development Server

- Install and start up Docker.
- Clone and `cd` into the project directory.
- Web server runs on port `8000` by default. Change in `docker-compose.yml` as needed.
- Build Docker containers: `docker-compose build`
- Run Docker containers: `docker-compose up`
- Open a new tab and run bash in the Django container: `docker exec -it music-server_web_1 bash`
- Run migrations: `python manage.py migrate`
- Create admin user: `python manage.py createsuperuser`
