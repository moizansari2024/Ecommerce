const express = require('express');
const router = express.Router();
const { protect } = require('../middlewear/authMiddlewear');
const { createProduct, getMyAds,getProductById , getProducts} = require('../controllers/productController'); 

// router.get('/', getProducts);
// router.post('/create', protect, createProduct);
// // router.get('/my-ads', protect, getMyAds);
// router.get('/:id', getProductById);
console.log("Product Routes file is being loaded...");
router.get('/', getProducts); 

// 2. My Ads
// router.get('/my-ads', protect, getMyAds);

// 3. Create Product
router.post('/create', protect, createProduct);

// 4. Single Product
router.get('/:id', getProductById);
module.exports = router;