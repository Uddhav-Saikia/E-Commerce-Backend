const makeController = require('./_templateController');
const SalesOrder = require('../models/salesOrder');
module.exports = makeController(SalesOrder);
