// import React, { useEffect, useState } from 'react';
// import API from '../../../services/api'; // Aapka api.js
// import ProductCard from '../../ProductCard/ProductCard'; // Woh component jo humne pehle banaya tha

// const MyAds = () => {
//   const [myAds, setMyAds] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMyAds = async () => {
//       try {

//         const { data } = await API.get('/products/my-ads');
//         setMyAds(data.data);
//       } catch (error) {
//         console.error("Error fetching my ads:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMyAds();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold text-slate-800 mb-6">My Ads Listings</h1>
      
//       {loading ? (
//         <p>Loading your ads...</p>
//       ) : myAds.length === 0 ? (
//         <p className="text-slate-500">Aapne abhi tak koi ad post nahi kiya hai.</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {myAds.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAds;