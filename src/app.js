const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// setup handlebars engine and views locaion
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//set up atatic directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Emmanuel Salicrup'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Emmanuel Salicrup'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Emmanuel Salicrup',
        message: 'Hello, this is the help page.'
    })
})


app.get('/weather', (req, res) => {

    const address = req.query.address

    const myCallback = (error, {location, latitude, longitude} = {}) =>{ 

        if (error) {
            return  res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return  res.send({
                    error: error
                })
            } 
            res.send({
                address: address,
                location: location,
                forecast: forecastData
            })
          })
    }
    if(!address) {
        return res.send({
            error: 'you must provide an address query'
        })
    }
   
    geocode(address, myCallback)
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*', (req, res) =>{
    res.render('help', {
        title: '404',
        name: 'Emmanuel Salicrup',
        message: 'The help article you are looking for cannot seem to be found... the sadness.'
    })
})


app.get('*', (req, res) => {

    res.render('help', {
        title: '404',
        name: 'Emmanuel Salicrup',
        message: 'Sorry not found... sad day.'
    })

})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})