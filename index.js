const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('\u2705 Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/products', productRoutes);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/roles', require('./routes/roleRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/coupons', require('./routes/couponRoutes'));
app.use('/api/product-categories', require('./routes/productCategoryRoutes'));
app.use('/api/product-tags', require('./routes/productTagRoutes'));
app.use('/api/product-statuses', require('./routes/productStatusRoutes'));
app.use('/api/tags', require('./routes/tagRoutes'));
app.use('/api/sales-orders', require('./routes/salesOrderRoutes'));
app.use('/api/order-products', require('./routes/orderProductRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));

// Simple root
app.get('/', (req, res) => res.send('E-Commerce Backend API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`\u2705 Server running at http://localhost:${PORT}`));
