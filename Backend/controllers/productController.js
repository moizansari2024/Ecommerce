// const Product = require('../model/product');

// // 1. Create Product
// exports.createProduct = async (req, res) => {
//     try {
//         const { title, description, price, category, image, location } = req.body;
        
//         const loc = location || { longitude: 0, latitude: 0, city: 'Not specified' };

//         const newProduct = await Product.create({
//             title,
//             description,
//             price,
//             category,
//             image,
//             location: {
//                 type: 'Point',
//                 coordinates: [loc.longitude || 0, loc.latitude || 0],
//                 city: loc.city || 'Not specified'
//             },
//             owner: req.user.id 
//         });

//         res.status(201).json({ success: true, data: newProduct });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // 2. Get My Ads
// exports.getMyAds = async (req, res) => {
//     try {
//         const products = await Product.find({ owner: req.user.id }).sort({ createdAt: -1 });
//         res.status(200).json({ success: true, data: products });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // 3. Get Product By ID - Updated for "Call Seller" Feature
// exports.getProductById = async (req, res) => {
//     try {
//         // ✨ Yahan 'firstName', 'lastName', aur 'phone' ko populate kiya hai
//         const product = await Product.findById(req.params.id)
//             .populate('owner', 'firstName lastName phone email');
        
//         if (!product) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }

//         res.status(200).json({ success: true, data: product });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // 4. Get All Products (Naya function)
// exports.getProducts = async (req, res) => {
//     try {
//         // Aap yahan search ya filter logic bhi laga sakte hain
//         const products = await Product.find().sort({ createdAt: -1 });
//         res.status(200).json({ success: true, data: products });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

const Product = require('../model/product');

// 1. Create Product - Updated for contactPhone
exports.createProduct = async (req, res) => {
    try {
        const { title, description, price, category, image, location, contactPhone } = req.body;
        
        const loc = location || { longitude: 0, latitude: 0, city: 'Not specified' };

        const newProduct = await Product.create({
            title,
            description,
            price,
            category,
            image,
            contactPhone, // Ab product create karte waqt phone number lena zaroori hai
            location: {
                type: 'Point',
                coordinates: [loc.longitude || 0, loc.latitude || 0],
                city: loc.city || 'Not specified'
            },
            owner: req.user.id 
        });

        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Get Product By ID - Populated with basic owner info
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('owner', 'firstName lastName email'); 
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Get All Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
