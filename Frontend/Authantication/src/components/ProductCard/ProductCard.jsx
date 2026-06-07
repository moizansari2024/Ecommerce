import React, { useState, memo } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const pkrFormatter = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  minimumFractionDigits: 0,
});

const formatPrice = (price) => {
  if (!price) return 'Rs 0';
  return pkrFormatter.format(price).replace('PKR', 'Rs');
};

const ProductCard = memo(({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  
  if (!product) return <ProductCardSkeleton />;

  const { _id, title, price, image, location } = product;

  return (
    <article className="bg-white border border-slate-200 rounded-md overflow-hidden relative shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col h-full">
      <button 
        onClick={(e) => { e.preventDefault(); setIsFavorite(!isFavorite); }}
        className="absolute top-3 right-3 z-10 bg-white/90 p-2 rounded-full hover:bg-white shadow-sm transition-transform active:scale-90"
      >
        <Heart size={16} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'} />
      </button>

      <Link to={`/product/${_id}`} className="flex flex-col h-full">
        <div className="w-full aspect-[4/3] bg-slate-100 overflow-hidden">
         
          <img 
            src={image || '/placeholder-product.jpg'} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-3 flex flex-col flex-grow">
          <span className="text-lg font-bold text-slate-900">{formatPrice(price)}</span>
          <h3 className="text-sm text-slate-700 line-clamp-1 mt-1">{title}</h3>
          <footer className="text-[11px] text-slate-500 pt-3 mt-auto border-t border-slate-100 uppercase tracking-wide">
            {location?.city || 'Pakistan'}
          </footer>
        </div>
      </Link>
    </article>
  );
});

export const ProductCardSkeleton = () => (
  <div className="bg-slate-200 border rounded-md h-60 animate-pulse" />
);

export default ProductCard;