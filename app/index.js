const Fastify = require('fastify')
const logger = require('../configs/logger')
const {ignoreTrailingSlash} = require('../configs/route')
//plugin routes
const routes = require('../routes')
//plugin db
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
