// export const initialAddressState = {
//   addresses: [],
//   selectedAddress: null,
// };

// export const addressReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_ADDRESS":
//       return {
//         ...state,
//         addresses: [...state.addresses, action.payload],
//       };

//     case "UPDATE_ADDRESS":
//       return {
//         ...state,
//         addresses: state.addresses.map((address) =>
//           address.id === action.payload.id
//             ? action.payload
//             : address
//         ),
//       };

//     case "DELETE_ADDRESS":
//       return {
//         ...state,
//         addresses: state.addresses.filter(
//           (address) => address.id !== action.payload
//         ),
//       };

//     case "SELECT_ADDRESS":
//       return {
//         ...state,
//         selectedAddress: action.payload,
//       };

//     default:
//       return state;
//   }
// };
// -------------------------------------------------------
export const initialAddressState = {
  addresses: [],
  selectedAddress: null,
  loading: false,
  error: null,
};

export const addressReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADDRESSES":
      return {
        ...state,
        addresses: action.payload,
        loading: false,
        error: null,
      };

    // case "SELECT_ADDRESS":
    //   return {
    //     ...state,
    //     selectedAddress: action.payload,
    //   };
    case "SELECT_ADDRESS":
  return {
    ...state,
    selectedAddress:
      state.selectedAddress?._id === action.payload?._id
        ? null
        : action.payload,
  };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    case "CLEAR_ADDRESSES":
      return initialAddressState;

    default:
      return state;
  }
};