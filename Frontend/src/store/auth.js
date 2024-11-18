import { createSlice } from '@reduxjs/toolkit';

// Initial state for the auth slice
const initialState = {
  isLoggedIn: false,
  role: null,
  user: null, // Store full user info
  wishlist: [], // Initial state for wishlist
  cart: [], // Initial state for cart
  
};

// Creating the authSlice using createSlice
const authSlice = createSlice({
  name: 'auth', // Name for the slice
  initialState,
  reducers: {
    // Reducer to handle login action
    login(state) {
      state.isLoggedIn = true;
    },
    
    // Reducer to handle logout action
    logout(state) {
      state.isLoggedIn = false;
      state.role = null;
      state.user = null;
      state.wishlist = []; // Clear wishlist on logout
      state.cart = []; // Clear cart on logout
    },
    
    // Reducer to change user's role
    changeRole(state, action) {
      state.role = action.payload;
    },
    
    // Reducer to set the full user information
    setUser(state, action) { 
      state.user = action.payload;
    },
    
    // Reducer to add item to wishlist
    addToWishlist(state, action) {
      state.wishlist.push(action.payload);
    },
    
    // Reducer to add item to cart
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
  },
});

// Exporting the actions so they can be dispatched in your components
export const {
  login,
  logout,
  changeRole,
  setUser,
  addToWishlist,
  addToCart,
  editProduct,
} = authSlice.actions;

// Exporting the reducer so it can be used in the store
export default authSlice.reducer;
