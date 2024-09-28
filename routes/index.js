const fp = require('fastify-plugin')

module.exports = fp(
    async function(appInstance){
        appInstance.get('/', {}, async function () {
            return {
                "app" : "rest-api",
                "version" : "1.0.0"
            };
        });

        appInstance.get('/users', {}, async function (request, reply) {
            console.log(appInstance.dbDecorator, "check decorator")
            try {
                const data = await this.dbDecorator("users").select("*")
                reply.send(
                    {
                        "statusCode" : 200,
                        "message" : "success",
                        "data" : data
                    }
                )
            } catch (error) {
                reply.send({
                    statusCode : 500,
                    message: `got error ${error}`,
                });
            }
        });

        appInstance.post('/user', {}, async function (request, reply) {
            try {
                const {name, email , status} = request.body
                data = await this.dbDecorator("users").insert({
                    name,
                    email,
                    status
                })
                reply.send({
                    statusCode : 200,
                    message: "new user created successfully | user id " + data[0]
                });
            } catch (error) {
                reply.send({
                    statusCode : 500,
                    message: `got error ${error}`,
                });
            }
        });

        appInstance.get('/user/:userId', {}, async function (request, reply) {
            const data = await this.dbDecorator("users").select("*").where({id: request.params.userId}).then(data => {
                if (data == 0) {
                    reply.send({
                        statusCode : 404,
                        message: "user not found",
                    });
                }
                reply.send({
                    statusCode : 200,
                    message: "user found",
                    data
                });
            })
            .catch(error => {
                reply.send({
                    statusCode : 500,
                    message: `got error ${error}`,
                });
            })
        });

        appInstance.delete('/user/:userId', {}, async function (request, reply) {
            const data = await this.dbDecorator("users").delete("*").where({id: request.params.userId}).then(data => {
                if (data == 0) {
                    reply.send({
                        statusCode : 404,
                        message: "user not found",
                    });
                }
                reply.send({
                    statusCode : 200,
                    message: "deleted successfully",
                });
            })
            .catch(error => {
                reply.send({
                    statusCode : 500,
                    message: `got error ${error}`,
                });
            })
        });
    },
    {name:"app-plugin-routes"},
)