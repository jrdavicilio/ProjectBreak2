const { Product, validColors } = require('../models/Product');
const baseHtml = require('../helpers/baseHtml');
const getNavBar = require('../helpers/getNavBar');

const showHome = async (req, res) => {
  try {
    const products = await Product.find();
    const html = baseHtml(
      getNavBar(false) + 
      '<h1>Productos</h1>' +
      '<div class="product-list">' +
      products.map(product => `
        <div class="product-card">
          <img src="${product.image || ''}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.price}€</p>
          <p>Color: ${product.color || 'Sin color'}</p>
          <a href="/products/${product._id}">Ver detalle</a>
        </div>
      `).join('') +
      '</div>'
    );
    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('There was an error loading the main page');
  }
};


const showProducts = async (req, res) => {
  try {
    const isDashboard = req.originalUrl.startsWith('/dashboard');
    const products = await Product.find();

    const productCards = products.map(product => `
      <div class="product-list">
        <div class="product-card">
          <img src="${product.image || ''}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.price}€</p>
          <p>Color: ${product.color || 'Sin color'}</p>
          <a href="${isDashboard ? `/dashboard/${product._id}` : `/products/${product._id}`}">Ver detalle</a>
          ${isDashboard ? `
            <a href="/dashboard/${product._id}/edit">Editar</a>
            <form action="/dashboard/${product._id}/delete" method="POST" style="display:inline;">
              <button class="deleteProduct" type="submit" onclick="return confirm('¿Estas seguro/a de que quieres eliminar este producto?')">Eliminar</button>
            </form>
          ` : ''}
        </div>
      </div>
    `).join('');

    const html = baseHtml(`
      ${getNavBar(isDashboard)}
      <h1>${isDashboard ? 'Dashboard' : 'Productos'}</h1>
      <a href="/dashboard/new" style="display:${isDashboard ? 'inline-block' : 'none'}; margin-bottom: 10px;">Crear producto nuevo</a>
      <div class="product-list">${productCards}</div>
    `);

    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('There was an error loading the products');
  }
};

const showProductById = async (req, res) => {
  try {
    const isDashboard = req.originalUrl.startsWith('/dashboard');
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send('Product not found');

    const html = baseHtml(`
      ${getNavBar(isDashboard)}
      <h1>${product.name}</h1>
      <img src="${product.image || ''}" alt="${product.name}" />
      <p>${product.price}€</p>
      <p>Color: ${product.color || 'Sin color'}</p>
      ${isDashboard ? `
        <a href="/dashboard/${product._id}/edit">Editar</a>
        <form action="/dashboard/${product._id}/delete" method="POST" style="display:inline;">
          <button class="deleteProduct" type="submit" onclick="return confirm('¿Estas seguro/a de que quieres eliminar este producto?')">Eliminar</button>
        </form>
        <br><a href="/dashboard">Volver al dashboard</a>
      ` : `
        <a href="/products">Volver a productos</a>
      `}
    `);

    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('There was an error loading the product');
  }
};

const showNewProduct = (req, res) => {
  const html = baseHtml(`
    ${getNavBar(true)}
    <h1>Crear nuevo producto</h1>
    <form action="/dashboard" method="POST" enctype="multipart/form-data">
      <p>
        <label for="name">Nombre:</label>
        <input name="name" id="name" placeholder="Nombre" required />
      </p>
      <p>
        <label for="image">Imagen (archivo):</label>
        <input type="file" name="image" id="image" accept="image/*" />
      </p>
      <p>
        <label for="color">Color:</label>
        <select name="color" id="color" required>
          <option value="">Selecciona un color</option>
          ${validColors.map(color => `<option value="${color}">${color}</option>`).join('')}
        </select>
      </p>
      <p>
        <label for="price">Precio (€):</label>
        <input name="price" id="price" type="number" min="0" step="0.01" placeholder="Precio" required />
      </p>
      <button class="createProduct" type="submit">Crear producto</button>
    </form>
    <a href="/dashboard">Volver al dashboard</a>
  `);

  res.send(html);
};

const createProduct = async (req, res) => {
  try {
    const { name, color, price } = req.body;

    if (!validColors.includes(color)) {
      return res.status(400).send('Color no válido');
    }

    const image = req.file ? req.file.path : '';

    const product = new Product({ name, color, price, image });
    await product.save();

    console.log('Producto creado:', product);

    res.send(res.redirect('/dashboard'));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creando producto');
  }
};

const showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');

    const html = baseHtml(`
      ${getNavBar(true)}
      <h1>Editar producto</h1>
      <form action="/dashboard/${product._id}?_method=PUT" method="POST" enctype="multipart/form-data">
        <p>
          <label for="name">Nombre:</label>
          <input name="name" id="name" value="${product.name}" required />
        </p>
        <p>
          <label for="image">Imagen (archivo):</label>
          <input type="file" name="image" id="image" accept="image/*" />
          <br/>
          Imagen actual:
          ${product.image ? `<img src="${product.image}" class="preview-image" alt="Imagen actual"/>` : 'No hay imagen'}
        </p>
        <p>
          <label for="color">Color:</label>
          <select name="color" id="color" required>
            ${validColors.map(color => `
              <option value="${color}" ${color === product.color ? 'selected' : ''}>${color}</option>
            `).join('')}
          </select>
        </p>
        <p>
          <label for="price">Precio (€):</label>
          <input name="price" id="price" type="number" min="0" step="0.01" value="${product.price}" required />
        </p>
        <button class="createProduct" type="submit">Actualizar producto</button>
      </form>
      <a href="/dashboard/${product._id}">Volver al detalle</a>
    `);

    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('There was an error loading the edition form');
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, color, price } = req.body;

    if (!validColors.includes(color)) {
      return res.status(400).send('Color no válido');
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');

    let image = product.image;
   if (req.file) {
  image = req.file.path;
}

    product.name = name;
    product.color = color;
    product.price = price;
    product.image = image;

    await product.save();

    res.redirect(`/dashboard/${product._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('There was an error trying to update the product');
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).send('Product not found');

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('There was an error trying to delete the product');
  }
};

module.exports = {
  showHome,
  showProducts,
  showProductById,
  showNewProduct,
  createProduct,
  showEditProduct,
  updateProduct,
  deleteProduct,
};
