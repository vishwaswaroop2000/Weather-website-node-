const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()


//Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location and partials location
app.set('view engine', 'hbs')//Used to setup handlebars
app.set('views', viewsPath)//use the renamed 'views' folder by providing custom directory
hbs.registerPartials(partialsPath)

//Serve static content for the app from the “public” directory in the application directory:
app.use(express.static(publicDirectory))


//use res.render to serve hbs files in the browser
app.get('', (req, res) => {
  res.render('index', {
    title: "Weather",
    name: "Vishwaswaroop"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: "Vishwaswaroop"
  })
})


app.get('/help', (req, res) => {
  res.render('help', {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Vishwaswaroop"
  })
})


app.get('/weather', (req, res) => {
  if (!req.query.address)
    return res.send({ error: "You must provide an address" })
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error)
      return res.send({ error })
    forecast(longitude, latitude, (error, data) => {
      if (error)
        return res.send({ error })
      return res.send({
        forecast: data,
        location: location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    error: "Help page not found",
    name: 'Vishwaswaroop',
    title: '404'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    error: "Error 404: Page not found",
    name: 'Vishwaswaroop'
  })
})

app.listen(3000, () => {
  console.log("running")
})