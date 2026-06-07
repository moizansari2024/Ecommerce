import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../../services/api';

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center p-10">Loading product details...</div>;
  if (!product) return <div className="text-center p-10">Product not found!</div>;

  return (
    <div>

      
      <div className="mt-6 p-4 bg-slate-50 rounded">
        <p className="font-bold">Location:</p>
        <p>{product.location?.city || 'Not specified'}</p>
      </div>


      <div className="mt-6 p-4 border-t border-gray-200">
        <h3 className="font-bold text-lg text-slate-800">Seller Information</h3>
        <p className="text-slate-600 mt-2">

          <span className="font-semibold">Name:</span> {product.owner?.firstName} {product.owner?.lastName}
        </p>
        <p className="text-slate-600">
  
          <span className="font-semibold">Phone:</span> {product.owner?.phone}
        </p>
      </div>


      <a 
        href={`tel:${product.owner?.phone}`}
        className="block w-full text-center bg-green-600 text-white py-3 rounded-md mt-6 font-bold hover:bg-green-700 transition"
      >
        Call Seller
      </a>
    </div>
  );
};

export default ProductDetail;