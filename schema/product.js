const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
  },
  order: Number,
  categories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'category',
    },
  ],
});

module.exports = mongoose.model('product', schema);
