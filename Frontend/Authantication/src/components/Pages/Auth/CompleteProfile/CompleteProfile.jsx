// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../../../../services/api';
// import useAuthStore from '../../../Store/useAuthStore';

// const CompleteProfile = () => {
//     const [phone, setPhone] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const { user, updateUser } = useAuthStore(); 

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {

//             const { data } = await API.put('/auth/update-profile', { phone });
            
         
//             updateUser({ ...user, phone: data.phone });
            
//             alert("Profile updated successfully!");
//             navigate('/'); 
//         } catch (error) {
//             console.error(error);
//             alert("Failed to update profile.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-slate-50">
//             <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
//                 <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
//                 <p className="text-slate-500 mb-6 text-sm">Please provide your phone number to start selling.</p>
                
//                 <input 
//                     type="tel" 
//                     placeholder="Enter your phone number" 
//                     className="w-full p-3 border rounded mb-4"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     required 
//                 />
                
//                 <button disabled={loading} className="w-full bg-slate-900 text-white p-3 rounded font-bold hover:bg-slate-800 transition">
//                     {loading ? "Saving..." : "Save & Continue"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CompleteProfile;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../../services/api';
import useAuthStore from '../../../Store/useAuthStore';

const CompleteProfile = () => {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, updateUser, isAuthenticated } = useAuthStore(); 

    // Security check: Agar user login nahi hai, toh direct redirect
    useEffect(() => {
        if (!isAuthenticated) navigate('/login');
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Backend call: ab yeh 'user' object return karega
            const { data } = await API.put('/auth/update-profile', { phone });
            
            if (data.success) {
                // Store mein pura user object update karein
                updateUser(data.user); 
                
                alert("Profile completed successfully!");
                navigate('/'); 
            }
        } catch (error) {
            console.error("Update failed:", error);
            alert(error.response?.data?.message || "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
                <p className="text-slate-500 mb-6 text-sm">Please provide your phone number to start selling.</p>
                
                <input 
                    type="tel" 
                    placeholder="03001234567" 
                    pattern="[0-9]{11}" 
                    title="Please enter a valid 11-digit phone number"
                    className="w-full p-3 border rounded mb-4"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required 
                />
                
                <button 
                    disabled={loading} 
                    className="w-full bg-slate-900 text-white p-3 rounded font-bold hover:bg-slate-800 transition disabled:bg-slate-400"
                >
                    {loading ? "Saving..." : "Save & Continue"}
                </button>
            </form>
        </div>
    );
};

export default CompleteProfile;