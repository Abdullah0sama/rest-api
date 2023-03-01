# FunAPP
A USA-based app

---
## Features
---
    - Register users
    - Limiting registration to users located in one of white listed countries (i.e USA)
    - Authentiction
    - Limiting some endpoints to authenticated users
    
--- 
## Details
---

For reverse geocoding (find city using coordinaties), I have used `Nominatim` API which is based on `OpenStreetMap` data. Despite the tight rate limits imposed by them, it was sufficient to demonstrate the idea. In real production scenario I would taken into consideration other alternatives such as `Google` API or other offline solutions, depending on the rate limits, expanses, etc.

--- 
## Swagger
---
    /api
---
## Installation
---
    
Install dependencies

    npm install
    

Start database

    docker-compose up -d

Npm Scripts

    npm run migrate:latest # run latest migration
    npm run seed # seed database
    npm run test # run tests
    npm run start # start server
