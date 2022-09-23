import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: false,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  return fetch("https://course-api.com/react-useReducer-cart-project")
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.cartItems = action.payload;
      state.isLoading = false;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, { payload }) => {
      console.log("hehe");
      state.cartItems = state.cartItems.filter((item) => item.id !== payload);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount++;
    },
    decrease: (state, { payload }) => {
      //console.log(payload);
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount--;
      // if (cartItem.amount < 1) payload.removeItem(payload);
    },
    calculateTotals: (state) => {
      const { amount, total } = state.cartItems.reduce(
        (initial, item) => {
          initial.amount += item.amount;
          initial.total += item.amount * item.price;
          return initial;
        },
        {
          amount: 0,
          total: 0,
        }
      );
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
