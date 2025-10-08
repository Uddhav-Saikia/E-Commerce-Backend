const makeController = require('./_templateController');
const OrderProduct = require('../models/orderProduct');
module.exports = makeController(OrderProduct);
