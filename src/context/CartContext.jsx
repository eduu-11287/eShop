import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cartItem, setCartItem] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItem));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItem]);

  const addToCart = (product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);
    if (itemInCart) {
      // Increase the quantity if already in cart
      const updatedCart = cartItem.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItem(updatedCart);
      toast.success("Item quantity updated");
    } else {
      // Add new item to cart with quantity 1
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Item added to cart");
    }
  };

  const updateQuantity = (cartItem, productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item.id === productId) {
            let newUnit = item.quantity;
            if (action === "increase") {
              newUnit += 1;
              toast.success("Item quantity increased");
            } else if (action === "decrease") {
              newUnit -= 1;
              toast.success("Item quantity decreased");
            }
            return newUnit > 0 ? { ...item, quantity: newUnit } : null;
          }
          return item;
        })
        .filter((item) => item !== null) // removes items with quantity 0
    );
  };

  const deleteItem = (productId) => {
    setCartItem(cartItem.filter((item) => item.id !== productId));
    toast.success("Item removed from cart");
  };

  return (
    <CartContext.Provider
      value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
};