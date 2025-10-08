const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// CRUD for products
router.get('/', productController.list);
router.get('/:id', productController.get);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove);

module.exports = router;
