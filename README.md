# KV Data Store

A key-value data store API built with Node.js, Express, Objection.js, and PostgreSQL. This project provides endpoints for creating, retrieving, deleting, and batch creating key-value pairs, with JWT authentication and Swagger documentation.

## Project Overview

The KV Data Store is designed to efficiently manage key-value pairs with support for batch operations and time-to-live (TTL) functionality. It ensures secure access through JWT authentication and provides a simple interface for token generation using Swagger.


## Technologies Used

- Node.js
- Express
- Objection.js
- PostgreSQL
- JWT (JSON Web Tokens)
- Swagger

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ujjwal15718/Key-Value-Data-Store-Service.git
    cd kv-data-store
    ```
    Set up the database:
    ```sh
    # Create the database in postgres
    createdb yourdbname

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the database:

    ```sh
    npx knex migrate:latest
    ```

## Configuration

Create a `.env` file in the root directory and add the following environment variables:


## Database connection
DB_HOST=localhost DB_USER=postgres DB_PASSWORD=yourpassword DB_NAME=yourdbname

## Server connection
PORT=3000

## JWT secret
JWT_SECRET=yourjwtsecret  
<!-- Take this variable in env and store any random values that will become the secret key-->

## Usage

Start the server:
```sh
npm start
The server will run on http://localhost:3000.


## API Endpoints (Authentication)

POST /auth/generate-token
{
  "email": "user@example.com"
}

## Key-Value Operations
POST /api/object
{
  "key": "yourkey",
  "data": "yourdata",
  "ttl": 3600
}

GET /api/object/:key

{
  "id": 1,
  "key": "yourkey",
  "data": "yourdata",
  "ttl": 3600,
}

DELETE /api/object/:key

## Batch Operations
POST /api/batch/object
[
  {
    "key": "key1",
    "data": "data1",
    "ttl": 3600
  },
  {
    "key": "key2",
    "data": "data2",
    "ttl": 3600
  }
]


## Running Tests
This project includes automated tests to ensure the functionality of the API endpoints. The tests are written using Jest and Supertest.

Running the Tests
To run the tests, use the following command:
npm test

Test Cases
The test cases cover the following scenarios:

POST /api/object
Should create a new key-value pair.
GET /api/object/:key
Should retrieve an existing key-value pair.
Should return 404 for a non-existent key.
DELETE /api/object/:key
Should delete an existing key-value pair.
Should return 404 for a non-existent key.
