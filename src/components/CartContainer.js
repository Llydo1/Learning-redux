import CartItem from "./CartItem";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../features/modal/modalSlice";
import { calculateTotals } from "../features/cart/cartSlice";
import { getCartItems } from "../features/cart/cartSlice";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, total, amount, isLoading } = useSelector(
    (store) => store.cart
  );

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading)
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>Your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <butn className="btn clear-btn" onClick={() => dispatch(openModal())}>
          clear cart
        </butn>
      </footer>
    </section>
  );
};

export default CartContainer;
