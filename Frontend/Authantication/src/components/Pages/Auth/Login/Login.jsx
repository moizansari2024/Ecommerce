// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
// import { GoogleLogin } from '@react-oauth/google'; 
// import useAuthStore from '../../../Store/useAuthStore'; 

// const Login = () => {
  
//   const navigate = useNavigate();
//   const { login, googleLogin } = useAuthStore();

//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (error) setError(''); 
//   };


//   const handleGoogleSuccess = async (credentialResponse) => {
//     setIsLoading(true);
//     setError('');
    
   
//     const result = await googleLogin(credentialResponse.credential);
//     setIsLoading(false);
    
//     if (result.success) {
//       if (result.needsPhoneUpdate) {
//         navigate('/complete-profile'); 
//       } else {
//         navigate('/');
//       }
//     } else {
//       setError(result.error || 'Google Authentication Failed');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); 

//     if (!formData.email || !formData.password) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     setIsLoading(true);
//     const result = await login(formData.email, formData.password);
//     setIsLoading(false);

//     if (result.success) {
//       navigate('/');
//     } else {
//       setError(result.error);
//     }
//   };

//   return (
//     <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center px-4 py-12">
//       <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
//           <p className="text-sm text-slate-500 mt-1">Login to manage your ads and chats</p>
//         </div>

//         {error && (
//           <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded flex items-center gap-2 font-medium">
//             <AlertCircle size={16} className="shrink-0" />
//             <span>{error}</span>
//           </div>
//         )}

     
//         <div className="flex justify-center mb-6">
//           <GoogleLogin
//             onSuccess={handleGoogleSuccess}
//             onError={() => setError('Google Sign-In failed.')}
            
//           />
//         </div>

//         <div className="relative flex items-center justify-center my-6">
//           <div className="border-t border-slate-200 w-full"></div>
//           <span className="absolute bg-white px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">OR</span>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-1.5">
//             <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
//             <div className="relative">
//               <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@domain.com" className="w-full border border-slate-300 h-11 pl-10 pr-4 text-sm rounded bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all" />
//               <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
//             </div>
//           </div>

//           <div className="space-y-1.5">
//             <div className="flex justify-between items-center">
//               <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
//               <a href="#" className="text-xs font-semibold text-cyan-600 hover:underline">Forgot?</a>
//             </div>
//             <div className="relative">
//               <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full border border-slate-300 h-11 pl-10 pr-4 text-sm rounded bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all" />
//               <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
//             </div>
//           </div>

//           <button type="submit" disabled={isLoading} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-11 rounded text-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70">
//             {isLoading ? 'Processing...' : 'Log In'}
//             {!isLoading && <ArrowRight size={16} />}
//           </button>
//         </form>

//         <div className="text-center mt-5 pt-5 border-t border-slate-100 text-sm text-slate-600">
//           New to OLX? <Link to="/register" className="font-bold text-cyan-600 hover:underline">Register here</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google'; 
import useAuthStore from '../../../Store/useAuthStore'; 

const Login = () => {
  const navigate = useNavigate();
  const { login, googleLogin } = useAuthStore();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); 
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError('');
    
    const result = await googleLogin(credentialResponse.credential);
    setIsLoading(false);
    
    if (result.success) {
      // Agar user Google se aaya hai aur phone number missing hai, toh complete profile par bhein
      if (result.needsPhoneUpdate) {
        navigate('/complete-profile'); 
      } else {
        navigate('/');
      }
    } else {
      setError(result.error || 'Google Authentication Failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    // Yahan aapka updated store function call ho raha hai
    const result = await login(formData.email, formData.password);
    setIsLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-1">Login to manage your ads and chats</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded flex items-center gap-2 font-medium">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Sign-In failed.')}
          />
        </div>

        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="absolute bg-white px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">OR</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="example@domain.com" 
                className="w-full border border-slate-300 h-11 pl-10 pr-4 text-sm rounded bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all" 
              />
              <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
              <a href="#" className="text-xs font-semibold text-cyan-600 hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="••••••••" 
                className="w-full border border-slate-300 h-11 pl-10 pr-4 text-sm rounded bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all" 
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-11 rounded text-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
          >
            {isLoading ? 'Processing...' : 'Log In'}
            {!isLoading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="text-center mt-5 pt-5 border-t border-slate-100 text-sm text-slate-600">
          New to OLX? <Link to="/register" className="font-bold text-cyan-600 hover:underline">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;