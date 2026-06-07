// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// // Pages Imports
// import Home from '../components/Pages/Home/Home';
// // import ProductDetail from '../components/Pages/ProductDetail/ProductDetail';
// // import PostAd from '../components/Pages/PostAd/PostAd';
// import MyAds from '../components/Pages/MyAds/MyAds';
// import Login from '../components/Pages/Auth/Login/Login';
// import Register from '../components/Pages/Auth/Register/Register';
// import CreateProduct from '../components/Pages/CreateProduct';

// // Global Store for Auth Checking (Optional but Industry Standard)
// import useAuthStore from '../components/Store/useAuthStore';

// /**
//  * Protected Route Wrapper
//  * Agar user login nahi hoga to yeh use automatic "/login" par bhej dega
//  */
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuthStore();
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* ===== PUBLIC ROUTES ===== */}
//       <Route path="/" element={<Home />} />
//       {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
      
//       {/* ===== AUTH ROUTES ===== */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       {/* <Route path="/create-product" element={<CreateProduct />} /> */}

//       {/* ===== PROTECTED ROUTES (Sirf Login Users ke liye) ===== */}
//       <Route 
//         path="/create-product" 
//         element={
//           <ProtectedRoute>
//             <CreateProduct />
//           </ProtectedRoute>
//         } 
//       />
//       <Route 
//         path="/my-ads" 
//         element={
//           <ProtectedRoute>
//             <MyAds />
//           </ProtectedRoute>
//         } 
//       />

//       {/* ===== 404 FALLBACK ===== */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// };

// export default AppRoutes;




import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Pages/Home/Home';
// import MyAds from '../components/Pages/MyAds/MyAds';
import Login from '../components/Pages/Auth/Login/Login';
import Register from '../components/Pages/Auth/Register/Register';
import CreateProduct from '../components/Pages/CreateProduct';
import useAuthStore from '../components/Store/useAuthStore';
import CompleteProfile from '../components/Pages/Auth/CompleteProfile/CompleteProfile';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
   
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      <Route 
        path="/create" 
        element={
          <ProtectedRoute>
            <CreateProduct />
          </ProtectedRoute>
        } 
      />
      {/* <Route 
        path="/my-ads" 
        element={
          <ProtectedRoute>
            <MyAds />
          </ProtectedRoute>
        } 
      /> */}
      
    
      <Route 
        path="/complete-profile" 
        element={
          <ProtectedRoute>
            <CompleteProfile />
          </ProtectedRoute>
        } 
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;