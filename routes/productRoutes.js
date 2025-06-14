const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).send(products)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'There was a problem trying to get all the products' })
  }
})

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).send({ message: `Product with ID ${req.params.id} not found` })
    }

    res.status(200).send(product)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: `There was a problem trying to get the product with ID ${req.params.id}` })
  }
})

router.get('/dashboard', async (req, res) => {
  try {
    const products = await Product.find()

    const dashboardData = products.map(product => ({
      id: product.id,
      name: product.name,
      color: product.color,
      price: product.price,
      editUrl: `/dashboard/${product.id}`
    }))

    res.status(200).json(dashboardData)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'There was a problem loading the dashboard' })
  }
})

router.get('/dashboard/new', (req, res) => {
  res.send(`
    <h1>New Product</h1>
    <form action="/dashboard" method="POST">
      <p>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required/>
      </p>

      <p>
        <label for="color">Color:</label>
        <select id="color" name="color" required>
          <option value="">--Select a color--</option>
          <option value="Rojo">Rojo</option>
          <option value="Azul">Azul</option>
          <option value="Verde">Verde</option>
          <option value="Negro">Negro</option>
          <option value="Blanco">Blanco</option>
        </select>
      </p>

      <p>
        <label for="price">Price:</label>
        <input type="number" id="price" name="price" min="0" step="0.01" required/>
      </p>

      <button type="submit">Create product</button>
    </form>
  `)
})

router.post('/dashboard', async (req, res) => {
  try {
    await Product.create(req.body)
    res.redirect('/dashboard')
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'There was a problem trying to create the product' })
  }
})

router.get('/dashboard/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).send({ message: `Product with ID ${req.params.id} not found` })
    }

    res.status(200).send(`
      <h1>Product Details</h1>
      <p><strong>Name:</strong> ${product.name}</p>
      <p><strong>Color:</strong> ${product.color}</p>
      <p><strong>Price:</strong> ${product.price}</p>

      <a href="/dashboard/${product.id}/edit">Edit product</a>
      <form action="/dashboard/${product.id}/delete" method="POST">
        <button type="submit">Delete product</button>
      </form>
      <a href="/dashboard">Back to dashboard</a>
    `)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: `There was a problem trying to get the product with ID ${req.params.id}` })
  }
})

router.get('/dashboard/:id/edit', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).send({ message: `Product with ID ${req.params.id} not found` })
    }

    res.status(200).send(`
      <h1>Edit Product</h1>
      <form action="/dashboard/${product.id}?_method=PUT" method="POST">
        <p>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" value="${product.name}" required />
        </p>

        <p>
          <label for="color">Color:</label>
          <select id="color" name="color" required>
            <option value="Rojo" ${product.color === 'Rojo' ? 'selected' : ''}>Rojo</option>
            <option value="Azul" ${product.color === 'Azul' ? 'selected' : ''}>Azul</option>
            <option value="Verde" ${product.color === 'Verde' ? 'selected' : ''}>Verde</option>
            <option value="Negro" ${product.color === 'Negro' ? 'selected' : ''}>Negro</option>
            <option value="Blanco" ${product.color === 'Blanco' ? 'selected' : ''}>Blanco</option>
          </select>
        </p>

        <p>
          <label for="price">Price:</label>
          <input type="number" id="price" name="price" min="0" step="0.01" value="${product.price}" required />
        </p>

        <button type="submit">Update product</button>
      </form>
      <a href="/dashboard/${product.id}">Back to details</a>
    `)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: `There was a problem trying to edit the product with ID ${req.params.id}` })
  }
})

router.put('/dashboard/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!updatedProduct) {
      return res.status(404).send('Product not found')
    }

    res.redirect(`/dashboard/${updatedProduct.id}`)
  } catch (error) {
    console.error(error)
    res.status(500).send(`There was an error trying to update the product with ID ${req.params.id}`)
  }
})

router.post('/dashboard/:id/delete', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)

    if (!deletedProduct) {
      return res.status(404).send('Product not found')
    }

    res.redirect('/dashboard')
  } catch (error) {
    console.error(error)
    res.status(500).send(`There was an error trying to delete the product with ID ${req.params.id}`)
  }
});

module.exports = router