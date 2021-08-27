import exprees from 'express'
import { fileURLToPath } from 'url';
import path from 'path';
import hbs from 'hbs'
import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(path.join(__dirname, '../public'))
// console.log(__filename)

const app = exprees()

const viewPath = path.join(__dirname, '../templates/views')
const publicDşrectoryPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)

hbs.registerPartials(partialPath)

app.use(exprees.static(publicDşrectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: "Muhamemt"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this is  some  helpful text',
        title: 'help',
        name: 'Muhammet'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about app',
        name: "Muhamemt"
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'you must provide  a search term'
        })
    } geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            console.log(location)
            console.log(forecastData)
            res.send({
                forecast:forecastData,
                location: location,
                address: req.query.address
            })
        })


    })

    // res.send({
    //     forecast:'it is snowing',
    //     location:'turkey',
    //     address:req.query.address 
    // })

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '400 ',
        name: 'Muhammet',
        errorMessage: "help artical not Found"
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide  a search term'
        })
    }
    res.send({
        products: []
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '400 ',
        name: 'Muhammet',
        errorMessage: "page not Found"
    })
})

app.listen(3000, () => {
    console.log("server is up  on port 3000")
})