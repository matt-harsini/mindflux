# mindflux

Web application to track your mood with an interactive calendar and display data through charts.

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
- SENDGRID_USERNAME
- SENDGRID_API_KEY
- JWT_SECRET
- JWT_LIFETIME
- MONGO_URI

## Deployment

Deployed on fly.io with a docker container.

https://fly.io/
