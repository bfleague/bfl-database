# BFL Database
Database microservice for the BFL Bot
## Setup
- Clone this repo and install the NPM dependencies.
- Setup a new MongoDB database if you don't already have one. Make sure to create two collections named "registers" and "stats"
- Configure the `.env` file:
```.env
PORT=3000 # WebSocket Port
DB_NAME="" # MongoDB Database Name
DB_URI="" # MongoDB Database Connection URI
```
- Run `npm run start` or `yarn start`
## License
[MIT](https://choosealicense.com/licenses/mit/)
## Authors
- [@gabrielbrop](https://github.com/gabrielbrop)