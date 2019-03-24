# sqlz_cli_test
Testing sequelize-cli migrations

(qonxi del futuro:)

1: npm i
2: mkdir config && touch config/config.json
3: vi config/config.json add:
{
  "development": {
    "username": "YOUR DB USER",
    "password": "YOUR DB PASS",
    "database": "YOUR DB NAME",
    "host": "localhost",
    "dialect": "postgres"
  }
}

4: sequelize db:create
   sequelize db:migrate

