const mongoose = require('mongoose');
const { comedorSchema } = require('./schemas');

const comedorModel = mongoose.model('comedor', comedorSchema);

module.exports = {comedorModel };