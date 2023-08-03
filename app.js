// app.js
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
// ----------------------------------------- mongo
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}) // 設定連線到 mongoDB

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})
// ----------------------------------------- setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
// ----------------------------------------- data
const Restaurant = require('./models/restaurant')

// ----------------------------------------- routes
// Read
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})
// Read
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find({ name: { $regex: keyword, $options: 'i' } })
    .lean()
    .then((restaurants) => res.render('index', { restaurants, keyword }))
    .catch((error) => console.error(error))
})
// Read
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  return Restaurant.findById(restaurant_id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})
// Read
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  return Restaurant.findById(restaurant_id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})
// Update
app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = req.body.name
      restaurant.category = req.body.category
      restaurant.location = req.body.location
      restaurant.google_map = req.body.google_map
      restaurant.phone = req.body.phone
      restaurant.description = req.body.description
      restaurant.image = req.body.image
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error))
})
// Delete
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
