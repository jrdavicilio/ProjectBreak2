function baseHtml(content) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Tienda</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      ${content}
    </body>
    </html>
  `
}

module.exports = baseHtml;