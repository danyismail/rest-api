const {appMode}= require('./app')
const logger = {
    development: 
        {
            transport: {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
                colorize: true
              },
            },
          }
    ,
    production: true,
    test: false,
  }
module.exports = logger[appMode]