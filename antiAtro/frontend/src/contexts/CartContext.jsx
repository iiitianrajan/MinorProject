import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });

  // ✅ ADD TO CART (FIXED TOAST ISSUE)
  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      setCart((prev) =>
        prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );

      toast.dismiss();
      toast.info("Quantity updated 🛒");

    } else {
      setCart((prev) => [...prev, { ...product, qty: 1 }]);

      toast.dismiss();
      toast.success("Added to cart 🛍️");
    }
  };

  // ✅ REMOVE ITEM
  const removeFromCart = (id) => {
    const item = cart.find((i) => i._id === id);

    setCart((prev) => prev.filter((item) => item._id !== id));

    if (item) {
      toast.dismiss();
      toast.error(`${item.name} removed ❌`);
    }
  };

  // ✅ INCREASE QTY
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );

    toast.dismiss();
    toast.info("Quantity increased ➕");
  };

  // ✅ DECREASE QTY
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );

    toast.dismiss();
    toast.info("Quantity decreased ➖");
  };

  // ✅ CLEAR CART
  const clearCart = () => {
    setCart([]);

    toast.dismiss();
    toast.error("Cart cleared 🗑️");
  };

  // ✅ TOTAL ITEMS
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  // ✅ TOTAL PRICE
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // ✅ SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);