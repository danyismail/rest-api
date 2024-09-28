const app = require('../app')

app.ready(() => {
    console.log(app.printPlugins())
})