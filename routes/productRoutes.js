const express = require ('express')
const router = express.Router()
const Product = require ('../models/Product')

router.get ('/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send(products)
    } catch (error) {
        console.error(error)
        res.status(500). send ({message: 'There was a problem trying to get all the products'})
    }
})

module.exports = router