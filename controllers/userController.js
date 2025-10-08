const makeController = require('./_templateController');
const User = require('../models/user');
module.exports = makeController(User);
