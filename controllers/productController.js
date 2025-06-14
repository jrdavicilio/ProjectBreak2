const Product = require('../models/Product')
const baseHtml = require('../helpers/baseHtml')
const getNavBar = require('../helpers/getNavBar')

const showProducts = async (req, res) => {
  try {
    const isDashboard = req.originalUrl.startsWith('/dashboard')
    const products = await Product.find()

    const productCards = products.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>${product.price}€</p>
        <a href="/products/${product._id}">Ver</a>
        ${isDashboard ? `
          <a href="/dashboard/products/${product._id}/edit">Editar</a>
          <form action="/dashboard/products/${product._id}/delete" method="POST">
            <button type="submit">Eliminar</button>
          </form>
        ` : ''}
      </div>
    `).join('')

    const html = baseHtml(`
      ${getNavBar(isDashboard)}
      <h1>Productos</h1>
      ${productCards}
    `)

    res.send(html)
  } catch (err) {
    res.status(500).send('There was an error loading the products')
  }
}

const showProductById = async (req, res) => {
  try {
    const isDashboard = req.originalUrl.startsWith('/dashboard')
    const product = await Product.findById(req.params.id)

    if (!product) return res.status(404).send('Product not found');

    const html = baseHtml(`
      ${getNavBar(isDashboard)}
      <h1>${product.name}</h1>
      <img src="${product.image}" alt="${product.name}" />
      <p>${product.description}</p>
      <p>${product.price}€</p>
      ${isDashboard ? `
        <a href="/dashboard/products/${product._id}/edit">Editar</a>
        <form action="/dashboard/products/${product._id}/delete" method="POST">
          <button type="submit">Eliminar</button>
        </form>
      ` : ''}
    `)

    res.send(html)
  } catch (err) {
    res.status(500).send('There was an error trying to load the products')
  }
}

const showNewProduct = (req, res) => {
  const html = baseHtml(`
    ${getNavBar(true)}
    <h1>Nuevo producto</h1>
    <form action="/dashboard/products" method="POST">
      <input name="name" placeholder="Nombre" required />
      <input name="image" placeholder="Imagen (URL)" required />
      <textarea name="description" placeholder="Descripción"></textarea>
      <input name="price" type="number" placeholder="Precio (€)" required />
      <button type="submit">Crear</button>
    </form>
  `)

  res.send(html)
}

const createProduct = async (req, res) => {
  try {
    await Product.create(req.body)
    res.redirect('/dashboard/products')
  } catch (err) {
    res.status(500).send('There was an error creating the product')
  }
}

const showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) return res.status(404).send('Product not found')

    const html = baseHtml(`
      ${getNavBar(true)}
      <h1>Editar producto</h1>
      <form action="/dashboard/products/${product._id}?_method=PUT" method="POST">
        <input name="name" value="${product.name}" required />
        <input name="image" value="${product.image}" required />
        <textarea name="description">${product.description}</textarea>
        <input name="price" type="number" value="${product.price}" required />
        <button type="submit">Actualizar</button>
      </form>
    `)

    res.send(html);
  } catch (err) {
    res.status(500).send('There was an error loading the product for editing')
  }
}

const updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`/dashboard/products/${req.params.id}`)
  } catch (err) {
    res.status(500).send('There was an error trying to update the product')
  }
}

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.redirect('/dashboard/products')
  } catch (err) {
    res.status(500).send('There was an error trying to delete the product')
  }
}

module.exports = {
  showProducts,
  showProductById,
  showNewProduct,
  createProduct,
  showEditProduct,
  updateProduct,
  deleteProduct
}


