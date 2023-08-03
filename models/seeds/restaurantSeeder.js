const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 model
const data = require('../../restaurants.json')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < data.results.length; i++) {
    Restaurant.create({
      name: data.results[i].name,
      name_en: data.results[i].name_en,
      category: data.results[i].category,
      image: data.results[i].image,
      location: data.results[i].location,
      phone: data.results[i].phone,
      google_map: data.results[i].google_map,
      rating: data.results[i].rating,
      description: data.results[i].description
    })
  }
  console.log('done')
})
