import { create } from 'zustand';
import API from '../../services/api'; // Aapka API service

const useProductStore = create((set) => ({
  products: [],
  loading: false,


  fetchProducts: async () => {
    set({ loading: true });
    try {
      const { data } = await API.get('/products');
      set({ products: data.data, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false, error: "Failed to fetch products" });
    }
  },

  // Action: Add New Ad (API Sync)
  addProduct: async (newProduct) => {
    try {
      const { data } = await API.post('/products/create', newProduct);
      set((state) => ({ products: [data.data, ...state.products] }));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Action: Delete Ad (API Sync)
  deleteProduct: async (id) => {
    try {
      await API.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id)
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useProductStore;