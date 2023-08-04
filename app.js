// ----------------------------------------- require
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
// ----------------------------------------- setting
const app = express()
const port = 3000
require('./config/mongoose')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)
// ----------------------------------------- start server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
