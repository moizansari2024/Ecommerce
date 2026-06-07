import { create } from 'zustand';

const useSearchStore = create((set) => ({
  // Global Search States
  searchQuery: '',
  locationQuery: 'Karachi, Pakistan',
  selectedCategory: 'All', 


  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setLocationQuery: (location) => set({ locationQuery: location }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),

 
  resetFilters: () => set({
    searchQuery: '',
    locationQuery: 'Karachi, Pakistan',
    selectedCategory: 'All'
  })
}));

export default useSearchStore;