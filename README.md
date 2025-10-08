# E-Commerce Backend (Local Demo)

This project contains a small Express API and Mongoose models for an e-commerce backend. For convenient demos the API will fall back to an in-memory store if MongoDB is not available.

## Requirements
- Node.js 18+ (or compatible)
- (Optional) MongoDB running locally or via connection string in `MONGO_URI`

## Setup
1. Install dependencies:

```bash
npm install
```

2. (Optional) Create a `.env` in the project root with:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
# or provide your MongoDB connection string
```

3. Start server:

```bash
npm start
```

If MongoDB is not reachable the API will use an in-memory store (useful for quick front-end testing).

## API Endpoints
- GET /api/products — list products
- GET /api/products/:id — get one product
- POST /api/products — create product (JSON body; sku and name required)
- PUT /api/products/:id — update product
- DELETE /api/products/:id — delete product

## Frontend demo
Open `frontend/index.html` in your browser (or serve it with a static server). It is configured to call `http://localhost:5000/api/products` and pre-fills demo product JSON.

## Notes
- The repo contains earlier Supabase-related code and Mongoose models; this change wires up a proper Express + Mongoose CRUD API for `products` and updates the frontend demo.
