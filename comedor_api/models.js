const mongoose = require('mongoose');
const { paySchema } = require('./schemas');

const payModel = mongoose.model('Pay', paySchema);

module.exports = {payModel };