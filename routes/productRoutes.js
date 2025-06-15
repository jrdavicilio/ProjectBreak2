const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/multer');

router.get('/', productController.showHome);

router.get('/products', productController.showProducts);

router.get('/products/:id', productController.showProductById);

router.get('/dashboard', productController.showProducts);

router.get('/dashboard/new', productController.showNewProduct);

router.post('/dashboard', upload.single('image'), productController.createProduct);

router.get('/dashboard/:id', productController.showProductById);

router.get('/dashboard/:id/edit', productController.showEditProduct);

router.put('/dashboard/:id', upload.single('image'), productController.updateProduct);

router.post('/dashboard/:id/delete', productController.deleteProduct);

module.exports = router;
