const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('../knexfile').development;

const knex = Knex(knexConfig);

// Bind all Models to the knex instance
Model.knex(knex);

module.exports = knex;