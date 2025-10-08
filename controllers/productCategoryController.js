const makeController = require('./_templateController');
const ProductCategory = require('../models/productCategory');
module.exports = makeController(ProductCategory);
