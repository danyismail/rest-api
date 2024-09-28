require('dotenv').config()

const aliasModule = {
    "development" : "development",
    "default" : "development",
    "production" : "production",
    "test" : "test",
    "prod" : "production",   
}

module.exports = {
    appMode: aliasModule[process.env.NODE_ENV] || aliasModule["default"],
    appHost : process.env.APP_HOST || aliasModule["localhost"],
    appPort : process.env.APP_PORT || 3000,
}