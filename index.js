const express = require ('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 3000

const routes = require ('./routes/productRoutes')
const dbConnection = require ('./config/db')
const cloudinary = require ('./config/cloudinary')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/', routes)

dbConnection()



app.listen(PORT, () => {console.log(`Server started on port http://localhost:${PORT}`)})