const makeController = require('./_templateController');
const Coupon = require('../models/coupon');
module.exports = makeController(Coupon);
