import { apiRequest } from "./api";

// GET ALL ADDRESSES
export const getAddresses = async () => {
  return await apiRequest(
    "/address",
    "GET",
    null,
    true
  );
};

// ADD NEW ADDRESS
export const addAddress = async (addressData) => {
  return await apiRequest(
    "/address",
    "POST",
    addressData,
    true
  );
};

// UPDATE ADDRESS
export const updateAddress = async (addressId, addressData) => {
  return await apiRequest(
    `/address/${addressId}`,
    "PUT",
    addressData,
    true
  );
};

// DELETE ADDRESS
export const deleteAddress = async (addressId) => {
  return await apiRequest(
    `/address/${addressId}`,
    "DELETE",
    null,
    true
  );
};