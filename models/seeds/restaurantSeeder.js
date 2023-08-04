const Restaurant = require('../restaurant')
const data = require('../../restaurants.json')

const db = require('../../config/mongoose')
db.once('open', () => {
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
