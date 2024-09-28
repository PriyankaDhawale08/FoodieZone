import React, { createContext, useContext, useReducer } from 'react';

// Create Context
const CartContext = createContext();
const CartDispatchContext = createContext();

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.item];
    case "REMOVE":
      return state.filter((_, index) => index !== action.index);
    case "DROP":
      return [];
    default:
      return state;
  }
};

// Provider
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

// Hooks
export const useCart = () => useContext(CartContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
