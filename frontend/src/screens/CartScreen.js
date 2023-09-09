import "./CartScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MagnifyingGlass from "./MagnifyingGlass";

// Components
import CartItem from "../components/CartItem";

// Actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    // Check for voice commands and perform actions based on the recognized command
    // Add your voice recognition code here if needed
  }, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  const handleItemHover = (item) => {
    const text = `Item: ${item.name}, Quantity: ${
      item.qty
    }, Price: $${item.price.toFixed(2)}`;
    const value = new SpeechSynthesisUtterance(text);

    window.speechSynthesis.speak(value);
  };

  const readCartDetails = () => {
    // Read cart items and details
    cartItems.forEach((item) => {
      handleItemHover(item);
    });
    // Read subtotal
    const subtotalText = `Subtotal: $${getCartSubTotal()}`;
    const subtotalValue = new SpeechSynthesisUtterance(subtotalText);
    window.speechSynthesis.speak(subtotalValue);
  };

  const proceedToCheckout = () => {
    // Implement the logic to proceed to checkout here
    // For example, you can navigate to the checkout page
    // using the router or perform any other necessary actions
    // before proceeding to checkout.
    // You can also add a message to confirm the checkout action.
    const checkoutText = "Proceeding to checkout. Confirm?";
    const checkoutValue = new SpeechSynthesisUtterance(checkoutText);
    window.speechSynthesis.speak(checkoutValue);
  };

  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product}
                onMouseEnter={() => handleItemHover(item)}
                className="cart-item"
              >
                <CartItem
                  item={item}
                  qtyChangeHandler={qtyChangeHandler}
                  removeHandler={removeFromCartHandler}
                  className="cart-item-image"
                />
              </div>
            ))
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <button onClick={proceedToCheckout}>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
