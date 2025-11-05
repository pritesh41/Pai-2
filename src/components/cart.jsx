import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: JSON.parse(localStorage.getItem('cart') || '[]') },
  reducers: {
    addToCart(state, action) {
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
