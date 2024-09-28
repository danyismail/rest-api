const fp = require('fastify-plugin')
const UserService = require('../services/userServices')
module.exports = fp(
    async function(appInstance){
        //inject and initialize userService
        const userService =  UserService(appInstance)
        appInstance.get('/', {}, async function () {
            return {
                "app" : "rest-api",
                "version" : "1.0.0"
            };
        });

        appInstance.get('/users', {}, async function (request, reply) {
            console.log(appInstance.db, "check decorator")
            const data = await userService.getList(appInstance)
            return reply.send(
                {
                    "statusCode" : 200,
                    "message" : "success",
                    "data" : data
                }
            )
        });

        appInstance.post('/user', {}, async function (request, reply) {
            try {
                const user = await userService.create(request.body)
                return reply.send({
                    statusCode : 200,
                    message: "new user created successfully",
                    payload: user
                });
            } catch (error) {
                reply.send({
                    statusCode : 500,
                    message: `got error ${error}`,
                });
            }
        });

        appInstance.get('/user/:userId', {}, async function (request, reply) {
            const data = await userService.show(request.params.userId)
            return reply.send(
                {
                    "statusCode" : 200,
                    "message" : "success",
                    "data" : data
                }
            )
        });

        appInstance.patch('/user/:userId', {}, async function (request, reply) {
            const data = await userService.update(request.body, request.params.userId)
            return reply.send(
                {
                    "statusCode" : 200,
                    "message" : "success",
                    "data" : data
                }
            )
        });

        appInstance.delete('/user/:userId', {}, async function (request, reply) {
            const data = await userService.destroy(request.params.userId)
            return reply.send(
                {
                    "statusCode" : 200,
                    "message" : "success",
                    "data" : data
                }
            )
        });
    },
    {name:"app-plugin-routes"},
)