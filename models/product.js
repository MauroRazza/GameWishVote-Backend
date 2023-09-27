const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  imageUrl: String,
  price: Number,
  name: String,
  description: String,
  brand: String,
  author: String,
  voteCount: { type: Number, default: 0 }, // Aggiungi un campo per il conteggio dei voti
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;


