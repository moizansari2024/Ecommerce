// import { create } from 'zustand';
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/v1/auth'; 

// const useAuthStore = create((set, get) => ({
//   user: localStorage.getItem('olx_user') ? JSON.parse(localStorage.getItem('olx_user')) : null,
//   token: localStorage.getItem('olx_token') || null,
//   isAuthenticated: !!localStorage.getItem('olx_token'),



//   googleLogin: async (accessToken) => {
//     try {
//       const response = await axios.post(`${API_URL}/google-login`, { idToken: accessToken });

//       if (response.data.success) {
//         const { user, token } = response.data;
//         localStorage.setItem('olx_user', JSON.stringify(user));
//         localStorage.setItem('olx_token', token);

//         set({ user, token, isAuthenticated: true });

//         return { success: true, needsPhoneUpdate: user.phone === '0000000000' };
//       }
//       return { success: false, error: 'Google Login Failed' };
//     } catch (error) {
//       return { success: false, error: error.response?.data?.message || 'Google Login Failed' };
//     }
//   },


//   updateUser: (updatedData) => {
//     set((state) => {
//       const newUser = { ...state.user, ...updatedData };
//       localStorage.setItem('olx_user', JSON.stringify(newUser)); // LocalStorage update
//       return { user: newUser };
//     });
//   },

//   logout: () => {
//     localStorage.removeItem('olx_user');
//     localStorage.removeItem('olx_token');
//     set({ user: null, token: null, isAuthenticated: false });
//   }
// }));


// axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem('olx_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default useAuthStore;

import { create } from 'zustand';
import API from '../../services/api'; // Aapka services folder wala API instance

const useAuthStore = create((set) => ({
  // --- State ---
  user: localStorage.getItem('olx_user') ? JSON.parse(localStorage.getItem('olx_user')) : null,
  token: localStorage.getItem('olx_token') || null,
  isAuthenticated: !!localStorage.getItem('olx_token'),

  // --- Actions ---

  // 1. Register User
  register: async (userData) => {
    try {
      const { firstName, lastName, email, password, phone } = userData;
      const payload = { firstName, lastName, email, password };
      
      // Phone optional hai, agar hai toh bhejein
      if (phone) payload.phone = phone;

      const response = await API.post('/auth/signup', payload);
      
      if (response.data.success) {
        const { user, token } = response.data;
        localStorage.setItem('olx_user', JSON.stringify(user));
        localStorage.setItem('olx_token', token);
        set({ user, token, isAuthenticated: true });
        return { success: true };
      }
      return { success: false, error: response.data.message };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  },
// 3. Manual Email/Password Login
  login: async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });

      if (response.data.success) {
        const { user, token } = response.data;
        
        localStorage.setItem('olx_user', JSON.stringify(user));
        localStorage.setItem('olx_token', token);

        set({ user, token, isAuthenticated: true });
        return { success: true };
      }
      return { success: false, error: response.data.message || 'Login Failed' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Invalid credentials' 
      };
    }
  },
  // 2. Google Login
  // googleLogin: async (accessToken) => {
  //   try {
  //     // API instance ka use karein (baseURL '/auth' se handle ho jayega agar zaroorat ho)
  //     const response = await API.post('/auth/google-login', { idToken: accessToken });

  //     if (response.data.success) {
  //       const { user, token } = response.data;
  //       localStorage.setItem('olx_user', JSON.stringify(user));
  //       localStorage.setItem('olx_token', token);

  //       set({ user, token, isAuthenticated: true });

  //       return { success: true, needsPhoneUpdate: user.phone === '0000000000' };
  //     }
  //     return { success: false, error: 'Google Login Failed' };
  //   } catch (error) {
  //     return { success: false, error: error.response?.data?.message || 'Google Login Failed' };
  //   }
  // },
// 2. Google Login
  googleLogin: async (accessToken) => {
    try {
      const response = await API.post('/auth/google-login', { idToken: accessToken });

      if (response.data.success) {
        const { user, token, needsPhoneUpdate } = response.data; // Backend se flag lein
        
        localStorage.setItem('olx_user', JSON.stringify(user));
        localStorage.setItem('olx_token', token);

        set({ user, token, isAuthenticated: true });

        // Ab hum hardcoded '00000...' ke bajaye backend ka flag return kar rahe hain
        return { success: true, needsPhoneUpdate }; 
      }
      return { success: false, error: 'Google Login Failed' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Google Login Failed' 
      };
    }
  },

  // 3. Update User Local State
  updateUser: (updatedData) => {
    set((state) => {
      const newUser = { ...state.user, ...updatedData };
      localStorage.setItem('olx_user', JSON.stringify(newUser));
      return { user: newUser };
    });
  },

  // 4. Logout
  logout: () => {
    localStorage.removeItem('olx_user');
    localStorage.removeItem('olx_token');
    set({ user: null, token: null, isAuthenticated: false });
  }
}));

export default useAuthStore;