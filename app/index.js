const Fastify = require('fastify')
const logger = require('../configs/logger')
const routes = require('../routes')
const {ignoreTrailingSlash} = require('../configs/route')
const dbPlugin = require('./plugins/knex')
const fastify = Fastify({
    logger,
    ignoreTrailingSlash
})
//register routes
fastify.register(routes)
//register knex/dbservice
fastify.register(dbPlugin)

module.exports = fastify
