const { Model } = require("objection");
const Knex = require("knex");
const config = require("../config/config");

const knex = Knex({
  client: "pg",
  connection: {
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
  },
});

Model.knex(knex);

module.exports = knex;
