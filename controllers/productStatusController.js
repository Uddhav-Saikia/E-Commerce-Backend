const makeController = require('./_templateController');
const ProductStatus = require('../models/productStatus');
module.exports = makeController(ProductStatus);
