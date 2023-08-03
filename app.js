// app.js
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
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

// ----------------------------------------- data
// const restaurantList = require('./restaurants.json')
const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')

// ----------------------------------------- routes
app.get('/', (req, res) => {
  // res.render('index', { restaurants: restaurantList.results })
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  // const restaurant = restaurantList.results.find(
  //   (restaurant) => restaurant.id.toString() === req.params.restaurant_id
  // )
  // res.render('show', { restaurant: restaurant })
  const restaurant_id = req.params.restaurant_id
  return Restaurant.findById(restaurant_id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
