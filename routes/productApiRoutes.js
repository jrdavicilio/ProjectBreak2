const express = require('express');
const router = express.Router();
const productApiController = require('../controllers/productApiController');

router.get('/products', productApiController.getAllProducts);
router.get('/products/:id', productApiController.getProductById);
router.post('/products', productApiController.createProduct);
router.put('/products/:id', productApiController.updateProduct);
router.delete('/products/:id', productApiController.deleteProduct);

module.exports = router;
