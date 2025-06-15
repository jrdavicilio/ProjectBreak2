function getProductCards(products) {
  let html = '<div class="product-grid">'
  for (let product of products) {
    html += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.price}€</p>
        <a href="/products/${product._id}">Ver detalle</a>
      </div>
    `
  }
  html += '</div>'
  return html
}

module.exports = { getProductCards }

