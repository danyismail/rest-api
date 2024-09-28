const app = require('./app')
const {appHost, appPort} = require('./configs/app')

console.log(appHost, appPort)

try {
    app.listen({host: appHost, port: appPort}, () => {
        app.log.info((`server running on port ${appPort}...`))
    });
} catch (error) {
    console.log(error)
    app.log.error(error)
    process.exit(1)
}