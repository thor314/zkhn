# Thor's notes
## deployment
Make sure .env files in rest_api include my updated username, password, and cluster name. 
Go to [atlas mongodb](https://www.mongodb.com/atlas/database) and login. Connect to the cluster for monitoring.

Shell 1:
```sh
cd rest-api 
nvm use 16.3 # nvm install 16.3 if not installed
npm i 
npm run dev
```

Shell 2: 
```sh
cd website
nvm use 16.3
npm i 
npm run dev
```

Navigate to https://localhost:3000
