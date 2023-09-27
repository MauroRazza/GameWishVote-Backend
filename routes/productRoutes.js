const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { productValidationParams, validateProduct } = require("../middlewares/productValidation");

// Route per ottenere tutti i prodotti
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Errore recupero dei prodotti' });
  }
});

// Route per ottenere i dettagli di un singolo prodotto
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Prodotto non trovato' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Errore recupero dei dettagli del prodotto' });
  }
});

// Route per aggiungere un nuovo prodotto
router.post('/products', productValidationParams, validateProduct, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Errore aggiunta del prodotto' });
  }
});

// Route per aggiornare un prodotto esistente
router.put('/products/:id', productValidationParams, validateProduct, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Prodotto non trovato' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Errore aggiornamento del prodotto' });
  }
});

// Route per eliminare un prodotto
router.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Prodotto non trovato' });
    }
    res.json({ message: 'Prodotto eliminato' });
  } catch (error) {
    res.status(500).json({ error: 'Errore eliminazione del prodotto' });
  }
});

// Aggiungi un voto a un prodotto
router.post("/products/vote/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    
    // Trova il prodotto dal database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Prodotto non trovato" });
    }

    // Incrementa il conteggio dei voti
    product.voteCount += 1;

    // Salva le modifiche nel database
    await product.save();

    res.json({ success: true, voteCount: product.voteCount });
  } catch (error) {
    console.error("Errore durante la gestione del voto:", error);
    res.status(500).json({ error: "Errore durante la gestione del voto" });
  }
});

module.exports = router;




