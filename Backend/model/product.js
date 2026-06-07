const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    
    // 1. Array of images (multiple photos support)
    images: { type: [String], required: true }, 
    
    // 2. Contact Phone (Product level)
    contactPhone: { type: String, required: true },
    
    // 3. Status (Available/Sold)
    status: { type: String, enum: ['available', 'sold'], default: 'available' },
    
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], index: '2dsphere' }, // Coordinate logic
        city: { type: String, required: true } 
    }
}, { timestamps: true });

// Indexes for searching
productSchema.index({ title: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);