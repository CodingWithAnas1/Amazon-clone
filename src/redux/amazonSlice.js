import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  query: null,
  userInfo: null,
};

export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    increaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      item.quantity++;
    },

    decreamentQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item.quantity > 1) {
        item.quantity--;
      }
    },

    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = item.quantity + action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    userLogout: (state) => {
      state.userInfo = null;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  increaseQuantity,
  decreamentQuantity,
  setUserInfo,
  userLogout,
  setQuery,
} = amazonSlice.actions;

export default amazonSlice.reducer;
