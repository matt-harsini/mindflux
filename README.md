# mindflux

Web application to track your mood and display data through charts.

Live site: <br/>
https://mindflux.dev

## Technologies

Core technologies used: <br/>
MongoDB, Mongoose, Node.js, Express, JavaScript, TypeScript, React, JWT

Used render, fly.io, and MongoDBAtlas, to host the frontend, server, and database respectively.

## Installation

To install, clone this repo, then cd into the server and client directories and run ```npm i```

Next, create a .env file and create secrets for each environment variable used in the server codebase.

### Environment variables

- PORT
- SENDGRID_API_KEY
- JWT_SECRET
- JWT_LIFETIME
- MONGO_URI

The ```SENDGRID_API_KEY``` can be found on sendgrid's website.
Use Node.js in the terminal to generate a JWT_SECRET using the built in crypto library.
Finally, you can go to MongoDB Atlas and get the connection string from the hosted database.

## Deployment

Look at the docs in the link below.

https://fly.io/

Follow the instructions to deploy an app and install Docker if you need to.
