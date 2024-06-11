const mongoose = require('mongoose');
const paySchema = new mongoose.Schema({
  code:{type: String, required: true},
  loanCode:{type: String, required: true},
  money:{type: Number,required:true},
  status:{type: String,required:true},
  createdAt: {type: Date, default: Date.now}
  });

  module.exports = {paySchema}