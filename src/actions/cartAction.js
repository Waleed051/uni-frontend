import axios from "axios";
import * as actions from "../constants/cartContants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `https://sleepy-plains-69712.herokuapp.com/api/products/${id}`
  );
  dispatch({
    type: actions.CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id, qty) => async (dispatch, getState) => {
  dispatch({
    type: actions.CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch, getState) => {
  dispatch({
    type: actions.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(getState().cart.cartItems)
  );
};

export const savePaymentMethod = (data) => async (dispatch, getState) => {
  dispatch({
    type: actions.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem(
    "paymentMethod",
    JSON.stringify(getState().cart.cartItems)
  );
};
