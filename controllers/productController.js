const Product = require('../models/product');
const mongoose = require('mongoose');

// In-memory fallback store (for demos when MongoDB is not available)
const inMemoryProducts = [];

function isDbConnected() {
  return mongoose && mongoose.connection && mongoose.connection.readyState === 1;
}

exports.list = async (req, res) => {
  try {
    if (!isDbConnected()) return res.json(inMemoryProducts);
    const products = await Product.find().limit(100).lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    if (!isDbConnected()) {
      const found = inMemoryProducts.find(p => p._id === req.params.id);
      if (!found) return res.status(404).json({ error: 'Product not found' });
      return res.json(found);
    }
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: 'Invalid product id' });
  }
};

exports.create = async (req, res) => {
  try {
    const payload = req.body;
    // minimal validation
    if (!payload.sku || !payload.name) return res.status(400).json({ error: 'sku and name are required' });

    if (!isDbConnected()) {
      // check duplicate sku
      const existing = inMemoryProducts.find(p => p.sku === payload.sku);
      if (existing) return res.status(409).json({ error: 'SKU already exists' });
      const id = `mem_${Date.now()}`;
      const record = Object.assign({ _id: id, inserted_at: new Date() }, payload);
      inMemoryProducts.push(record);
      return res.status(201).json(record);
    }

    const existing = await Product.findOne({ sku: payload.sku });
    if (existing) return res.status(409).json({ error: 'SKU already exists' });

    const created = await Product.create(payload);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (!isDbConnected()) {
      const idx = inMemoryProducts.findIndex(p => p._id === req.params.id);
      if (idx === -1) return res.status(404).json({ error: 'Product not found' });
      inMemoryProducts[idx] = Object.assign({}, inMemoryProducts[idx], req.body, { updated_at: new Date() });
      return res.json(inMemoryProducts[idx]);
    }
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    if (!isDbConnected()) {
      const idx = inMemoryProducts.findIndex(p => p._id === req.params.id);
      if (idx === -1) return res.status(404).json({ error: 'Product not found' });
      inMemoryProducts.splice(idx, 1);
      return res.json({ success: true });
    }
    const removed = await Product.findByIdAndDelete(req.params.id).lean();
    if (!removed) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

