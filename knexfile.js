const dbConfig =require('./configs/database')
// Update with your config settings.


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    ...dbConfig,
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
}

