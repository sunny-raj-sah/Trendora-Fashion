// import {
//   createContext,
//   useContext,
//   useReducer,
// } from "react";

// import {
//   addressReducer,
//   initialAddressState,
// } from "../reducers/addressReducer";

// const AddressContext = createContext();

// export const AddressProvider = ({ children }) => {

//   const [state, dispatch] = useReducer(
//     addressReducer,
//     initialAddressState
//   );

//   return (
//     <AddressContext.Provider
//       value={{
//         state,
//         dispatch,
//       }}
//     >
//       {children}
//     </AddressContext.Provider>
//   );
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAddress = () => {
//   return useContext(AddressContext);
// };
// --------------------------------------------------------------
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

import {
  addressReducer,
  initialAddressState,
} from "../reducers/addressReducer";

import {
  getAddresses as fetchAddressesAPI,
  addAddress as addAddressAPI,
  updateAddress as updateAddressAPI,
  deleteAddress as deleteAddressAPI,
} from "../api/addressApi";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    addressReducer,
    initialAddressState
  );

  // FETCH ALL ADDRESSES
  const fetchAddresses = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await fetchAddressesAPI();

      dispatch({
        type: "SET_ADDRESSES",
        payload: response.data || [],
      });

      return response;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });

      throw error;
    }
  }, []);

  // ADD ADDRESS
  const addAddress = async (addressData) => {
    try {
      dispatch({ type: "CLEAR_ERROR" });

      const response = await addAddressAPI(addressData);

      dispatch({
        type: "SET_ADDRESSES",
        payload: response.data || [],
      });

      return response;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });

      throw error;
    }
  };

  // UPDATE ADDRESS
  const updateAddress = async (addressId, addressData) => {
    try {
      dispatch({ type: "CLEAR_ERROR" });

      const response = await updateAddressAPI(
        addressId,
        addressData
      );

      dispatch({
        type: "SET_ADDRESSES",
        payload: response.data || [],
      });

      return response;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });

      throw error;
    }
  };

  // DELETE ADDRESS
  const deleteAddress = async (addressId) => {
    try {
      dispatch({ type: "CLEAR_ERROR" });

      const response = await deleteAddressAPI(addressId);

      dispatch({
        type: "SET_ADDRESSES",
        payload: response.data || [],
      });

      return response;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });

      throw error;
    }
  };

  // SELECT ADDRESS
  const selectAddress = (address) => {
    dispatch({
      type: "SELECT_ADDRESS",
      payload: address,
    });
  };

  // FETCH ADDRESSES WHEN USER IS AUTHENTICATED
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchAddresses().catch(() => {});
    }
  }, [fetchAddresses]);

  return (
    <AddressContext.Provider
      value={{
        state,
        dispatch,

        addresses: state.addresses,
        selectedAddress: state.selectedAddress,
        loading: state.loading,
        error: state.error,

        fetchAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        selectAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAddress = () => {
  return useContext(AddressContext);
};