# notey

A simple note taking app using Express on the BE and React&Redux on the FE.

# Instructions:

1. Install MongoDb
2. In the notey_api directory create a .env file. Here you can assign the environment variables `MONGODB_URI_LOCAL` for 
the dev environment, and `MONGODB_URI` for production.

for example: 
`MONGODB_URI_LOCAL=mongodb://localhost:27017/notey_local_db`

3. Run `$npm install` in notey_fe and notey_api directories

4. Starting everything at once:  
  In the main directory run  
  `$npm run startall`
  
5. Starting BE and FE separately:  
  `$cd notey_api`  
  `$npm run serve`  
In a separate terminal:  
  `$cd notey_fe`  
  `$npm start`
