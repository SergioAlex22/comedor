const mongoose = require('mongoose');
const comedorSchema = new mongoose.Schema({
  code:{type: String, required: true},
  codeStudent:{type: String, required: true},
  name:{type: String,required:true},
  createdAt: {type: Date, default: Date.now}
  });

  module.exports = {comedorSchema}