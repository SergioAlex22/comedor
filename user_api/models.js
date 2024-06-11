const mongoose = require('mongoose');
const { alumnoSchema } = require('./schemas');

const alumnoModel = mongoose.model('Alumno', alumnoSchema);

module.exports = {alumnoModel };