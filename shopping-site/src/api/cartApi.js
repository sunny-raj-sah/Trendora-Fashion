
import { apiRequest } from "./api";

// Get Logged In User Cart
export const getCart = async () => {
  return await apiRequest(
    "/cart",
    "GET",
    null,
    true
  );
};

// Add Product To Cart
export const addToCart = async (productId) => {
  return await apiRequest(
    `/cart/${productId}`,
    "POST",
    null,
    true
  );
};

// Update Cart Quantity
export const updateCartQuantity = async (
  productId,
  action
) => {
  return await apiRequest(
    `/cart/${productId}`,
    "PUT",
    { action },
    true
  );
};

// Remove Product From Cart
export const removeFromCart = async (productId) => {
  return await apiRequest(
    `/cart/${productId}`,
    "DELETE",
    null,
    true
  );
};
