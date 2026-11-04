// import {
//   createContext,
//   useContext,
//   useReducer,
// } from "react";

// import {
//   cartReducer,
//   initialCartState,
// } from "../reducers/cartReducer";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(
//     cartReducer,
//     initialCartState
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         state,
//         dispatch,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export const useCart = () => useContext(CartContext);

// -------------------------------------------------------------

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

import {
  cartReducer,
  initialCartState,
} from "../reducers/cartReducer";

import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "../api/cartApi";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(
    cartReducer,
    initialCartState
  );

  const { state: authState } = useAuth();

  const token = authState.token;

  // ===========================
  // Fetch Cart
  // ===========================
  const fetchCart = useCallback(async () => {

    if (!token) {
      dispatch({ type: "CLEAR_CART" });
      return;
    }

    try {

      const response = await getCart();

      dispatch({
        type: "SET_CART",
        payload: response.data || [],
      });

    } catch (error) {

      console.error("Fetch Cart Error:", error);

    }

  }, [token]);

  // ===========================
  // Add Product To Cart
  // ===========================
  const addProductToCart = async (productId) => {

    try {

      const response = await addToCart(productId);

      dispatch({
        type: "SET_CART",
        payload: response.data,
      });

      return {
        success: true,
        message: response.message,
      };

    } catch (error) {

      return {
        success: false,
        message: error.message,
      };

    }
  };

  // ===========================
  // Update Cart Quantity
  // ===========================
  const changeCartQuantity = async (
    productId,
    action
  ) => {

    try {

      const response = await updateCartQuantity(
        productId,
        action
      );

      dispatch({
        type: "SET_CART",
        payload: response.data,
      });

      return {
        success: true,
        message: response.message,
      };

    } catch (error) {

      return {
        success: false,
        message: error.message,
      };

    }
  };

  // ===========================
  // Remove Product From Cart
  // ===========================
  const deleteCartItem = async (productId) => {

    try {

      const response = await removeFromCart(productId);

      dispatch({
        type: "SET_CART",
        payload: response.data,
      });

      return {
        success: true,
        message: response.message,
      };

    } catch (error) {

      return {
        success: false,
        message: error.message,
      };

    }
  };

  // ===========================
  // Clear Cart
  // ===========================
  const clearCart = () => {

    dispatch({
      type: "CLEAR_CART",
    });

  };

  // ===========================
  // Load Cart On Login
  // ===========================
  useEffect(() => {

    if (token) {
      fetchCart();
    } else {
      clearCart();
    }

  }, [token, fetchCart]);

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,

        fetchCart,
        addProductToCart,
        changeCartQuantity,
        deleteCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
