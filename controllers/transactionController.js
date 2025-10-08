const makeController = require('./_templateController');
const CCTransaction = require('../models/Transaction');
module.exports = makeController(CCTransaction);
