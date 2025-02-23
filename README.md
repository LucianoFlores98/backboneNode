# Node with relational database service

In this project we use Node with typescript v5.6.2.

## Setting up development environment

At the root of the project folder, you should run `npm install` or `npm i`.

## Prerequisites

First at all, you need to install postgresql to run this project correctly.

After that, you need to do two important things:

- 1: Create a database in the postgres client. It's too important to use the same name that you wrote in the environment file.
- 2: execute the migration scripts that is on the package.json file:
  -- `npm run migrations:init`: To create an empty project. This will create following folders: config, models, migrations, seeders
  -- `npm run migrations:run`: Run the migrations
  -- `npm run migrations:seeds`: Run the seeds
Find more details about migrations with sequelize in the official doc: https://sequelize.org/docs/v6/other-topics/migrations/

## Run project

Run `npm run dev` to start nodemon service

### Architecture

This service was designed using Domain Driven Design MVP (**Model View Presenter**). The objective of this architecture is the separation of concerns by dividing it into layers. Each one has at least one layer for business rules and other for interfaces.

Some of the advantages are:

- Independent of Frameworks: The architecture does not depend on the existence of some library of feature laden software. This allows you to use such frameworks as tools, rather than having to cram your system into their limited constraints.
- Testable: The business rules can be tested without the UI, Database, Web Server, or any other external element.
- Independent of Database: You can swap out Oracle or SQL Server, for Mongo, BigTable, CouchDB, or something else. Your business rules are not bound to the database.
- Independent of any external agency: In fact your business rules simply don’t know anything at all about the outside world.

You will find files with names like Repository, Models, Action, services, etc. Each logical module has two important divisions:

- **Core**: contains the entities, actions and interfaces of repositories, gateways and services.
- **Infrastructure**: contains the implementations of controllers, models, repository, routes and services.

Besides, each module contains a file in the root module folder for configure and initialize the module. Here you can inject the dependencies of the module.

### Dependency Injection and IoC

For dependency injection we create a custom implementation using Context library. The `index.ts` file initializes the **DependencyManager**. Then, while the application is loading each module save theirs dependencies and obtain other dependencies of another modules. Therefore, the initialization order of the modules is important. If one module pull a dependency that not yet loaded throws an error in time of execution when the app is loaded.

### Environment variables

- **DATABASE**: Database name
- **DB_USERNAME**: Database username
- **DB_PASSWORD**: Database password
- **TIME_INACTIVITY**: time to invalidate the user session.
- **DB_URI**: Database host
- **DB_URI**: Port where the service will be running

### Dependencies

    "@types/express": "^5.0.0",
    "@types/mocha": "^10.0.8",
    "@types/sinon": "^17.0.3",
    "@types/sinon-express-mock": "^1.3.12",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "mysql2": "^3.11.3",
    "nodemon": "^3.1.7",
    "sequelize": "^6.37.4",
    "sinon": "^19.0.2",
    "sinon-express-mock": "^2.2.1",
    "sqlite3": "^5.1.7",
    "ts-sinon": "^2.0.2"
