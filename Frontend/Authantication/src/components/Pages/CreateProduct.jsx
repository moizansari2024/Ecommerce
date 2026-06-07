import React, { useState } from 'react';
import API from '../../services/api';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        title: '', description: '', price: '', category: '', city: ''
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpload = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "hgker9x3");

        const res = await fetch(`https://api.cloudinary.com/v1_1/dqlomnuo4/image/upload`, {
            method: "POST",
            body: data
        });
        const result = await res.json();
        return result.secure_url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select an image");
        
        setLoading(true);
        try {
            const imageUrl = await handleUpload();
            
            await API.post('/products/create', {
                ...formData,
                image: imageUrl,
                location: { 
                    city: formData.city, 
                    latitude: 0, 
                    longitude: 0 
                }
            });
            
            alert("Product successfully posted!");
    
            setFormData({ title: '', description: '', price: '', category: '', city: '' });
            setFile(null);
        } catch (error) {
            console.error(error);
            alert("Error: " + (error.response?.data?.message || "Something went wrong"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Post New Product</h2>
                
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" required />
                
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" required />
                
                <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" required>
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Furniture">Furniture</option>
                </select>

                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" rows="4" required />
                
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City (e.g. Karachi)" className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" required />
                
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Product Image</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full p-2 border border-slate-300 rounded" required />
                </div>
                
                <button disabled={loading} className="w-full bg-slate-900 text-white p-3 rounded font-bold hover:bg-slate-800 transition-colors disabled:opacity-50">
                    {loading ? "Posting Ad..." : "Post Product"}
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;