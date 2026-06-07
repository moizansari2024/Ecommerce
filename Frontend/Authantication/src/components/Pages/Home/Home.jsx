import React, { useEffect, useState } from 'react';
import API from '../../../services/api';
import ProductCard, { ProductCardSkeleton } from '../../ProductCard/ProductCard';
import useSearchStore from '../../Store/useSearchStore';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const { searchQuery, selectedCategory } = useSearchStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await API.get('/products');
        console.log("Backend se aaya data:", res.data);
        // response.data mein aapka data hota hai, phir uske andar .data (jo aapne backend se bheja)
        setProducts(response.data?.data || []);
      } catch (error) {
        console.error("Error loading products:", error);
        // Yahan aap error state bhi set kar sakte hain
      } finally {
        setLoading(false);
      }
    };
  }, []);


  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Fresh Recommendations</h1>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-slate-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;