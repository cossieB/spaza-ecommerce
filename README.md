# Spaza Game Store
### Full-Stack ecommerce website powered by React, .NET 6 web api and Docker.

## Instructions

1. Clone this repo and ```cd``` into the folder
1. Run ```docker-compose up.```
1. Open ```http://localhost:3000``` in your browser

## Alternatively
1. Install the dotnet 6 SDK, postgres 14 and Node, if you don't already have them installed.
1. Clone this repo and ```cd``` into the folder
1. Open psql and use the \i command to run the SQL script in ```db/docker-entrypoint-initdb.d/dump.sql```
1.  ```cd``` into the backend folder and run ```dotnet run```
1. ```cd``` into the client folder and run ```npm install``` then ```npm start```
1. Open ```http://localhost:3000``` in your browser
