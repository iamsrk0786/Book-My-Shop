const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  description: {
    type: String,
    
  },
price: {
    type: Number,
  },

  duration: {
    type: String,
  },
});

const Service = mongoose.model('Service', serviceSchema) ;

module.exports = Service