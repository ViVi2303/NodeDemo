const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  order: {
    type: Number,
    require: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});
module.exports = mongoose.model('Category', CategorySchema);
