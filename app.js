// Full Documentation - https://www.turbo360.co/docs
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})

// initialize app
const app = vertex.app()

// import routes
const index = require('./routes/index')
const api = require('./routes/api')
const admin = require('./routes/admin')

// set routes
app.use('/', index)
app.use('/api', api) // sample API Routes
app.use('/admin', admin)


module.exports = app