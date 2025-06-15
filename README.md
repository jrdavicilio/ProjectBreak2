# ProjectBreak2

# Tienda de Ropa - API y Aplicación Web

Este proyecto es una tienda online de ropa desarrollada con Node.js, Express y MongoDB. Permite gestionar productos mediante un CRUD completo (Crear, Leer, Actualizar, Eliminar), con imágenes almacenadas en Cloudinary y vistas renderizadas con Server-Side Rendering (SSR).

---

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework web para Node.js.
- **MongoDB**: Base de datos NoSQL para almacenar productos.
- **Mongoose**: ODM para MongoDB.
- **Cloudinary**: Almacenamiento y gestión de imágenes en la nube.
- **Multer + multer-storage-cloudinary**: Para subir y gestionar imágenes.
- **Dotenv**: Gestión de variables de entorno.
- **Nodemon** (opcional): Para desarrollo con recarga automática.
- **Method-override**: Para soportar métodos HTTP PUT y DELETE en formularios HTML.

---

## Instalación y configuración

1. Clona este repositorio:

```bash
git clone https://github.com/jrdavicilio/ProjectBreak2
cd projectbreak2
```

2. Instala las dependencias:
```bash
Editar
npm install
```

3. Crea un archivo .env en la raíz del proyecto con las siguientes variables:
```bash
PORT=3000
MONGO_URI=tu_uri_de_mongodb
CLOUDINARY_API_NAME=tu_nombre_cloudinary
CLOUDINARY_API_KEY=tu_api_key_cloudinary
CLOUDINARY_API_SECRET=tu_api_secret_cloudinary
```
4. Ejecuta el servidor:
```bash
npm start
```
Por defecto el servidor correrá en http://localhost:3000

---

## Estructura del proyecto

- config/
Configuraciones de base de datos y Cloudinary.

- controllers/
Lógica para manejar rutas API y SSR (productos).

- middlewares/
Configuración de multer para subida de imágenes.

- models/
Esquemas de MongoDB (Producto).

- helpers/
Funciones auxiliares para generar HTML y la barra de navegación.

- public/
Archivos estáticos (CSS).

- routes/
Definición de rutas para API y vistas.

## Endpoints API
- GET	/api/products --> Obtener todos los productos
- GET	/api/products/:id --> Obtener un producto por ID
- POST	/api/products --> Crear un nuevo producto
- PUT	/api/products/:id --> Actualizar producto por ID
- DELETE	/api/products/:id --> Eliminar producto por ID

## Rutas para interfaz web (SSR)
- GET	/ --> Página principal con lista productos
- GET	/products --> Listado de productos
- GET	/products/:id --> Detalle de un producto
- GET	/dashboard --> Dashboard de administración
- GET	/dashboard/new --> Formulario para crear nuevo producto
- POST	/dashboard --> Crear nuevo producto (formulario)
- GET	/dashboard/:id --> Detalle producto en dashboard
- GET	/dashboard/:id/edit --> Formulario para editar producto
- PUT	/dashboard/:id --> Actualizar producto (formulario)
- POST	/dashboard/:id/delete --> Eliminar producto

---

## Funcionalidades principales
- CRUD completo para productos con validación de colores.
- Subida de imágenes con Multer y almacenamiento en Cloudinary.
- Visualización dinámica de productos con SSR.
- Panel de administración para crear, editar y eliminar productos.
- Navegación sencilla y responsive (con CSS básico).
- Manejo de errores y respuestas HTTP adecuadas.

## Cómo usar
- Entra en http://localhost:3000/ para ver la tienda.
- Entra en http://localhost:3000/dashboard para administrar productos.
- Usa los formularios para crear, editar o eliminar productos.
- Las imágenes se subirán automáticamente a Cloudinary.
- También puedes usar la API REST para consumir los datos desde otros clientes.

## Autor
David Fernández Alonso - davidferal26@gmail.com
Repositorio: https://github.com/jrdavicilio/ProjectBreak2
