// import { toast } from "react-toastify";
// import { useAddress } from "../../context/AddressContext";

// const AddressCard = ({ address, showActions = true, onEdit }) => {
//   const { state: addressState, dispatch: addressDispatch } = useAddress();

//   const isSelected = addressState.selectedAddress?.id === address.id;

//   return (
//     <div
//       className={`card shadow-sm mb-4 ${
//         isSelected ? "border border-3 border-primary" : ""
//       }`}
//     >
//       <div className="card-body">
//         <div className="form-check mb-3">
//           <input
//             className="form-check-input"
//             type="radio"
//             name="selectedAddress"
//             checked={isSelected}
//             onChange={() => {
//               addressDispatch({
//                 type: "SELECT_ADDRESS",
//                 payload: address,
//               });

//               toast.success("Address selected successfully");
//             }}
//           />

//           <label className="form-check-label fw-bold">Deliver Here</label>
//         </div>

//         <h5 className="fw-bold">{address.name}</h5>

//         <p className="mb-1">{address.street}</p>

//         <p className="mb-1">
//           {address.city}, {address.state}
//         </p>

//         <p className="mb-1">
//           {address.country} - {address.pincode}
//         </p>

//         <p>
//           <strong>Phone :</strong> {address.phone}
//         </p>

//         {showActions && (
//           <div className="d-flex gap-2 mt-3">
//             <button
//               className="btn btn-outline-primary"
//               onClick={() => {
//                 onEdit(address);
//                 toast.success("Edit the Address");
//               }}
//             >
//               Edit
//             </button>

//             <button
//               className="btn btn-outline-danger"
//               onClick={() => {
//                 addressDispatch({
//                   type: "DELETE_ADDRESS",
//                   payload: address.id,
//                 });
//                 toast.success("Address deleted successfully");
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddressCard;
// ----------------------------------------------------------------------

// new


import { useState } from "react";
import { toast } from "react-toastify";
import { useAddress } from "../../context/AddressContext";

const AddressCard = ({
  address,
  showActions = true,
  onEdit,
}) => {
  const {
    selectedAddress,
    selectAddress,
    deleteAddress,
  } = useAddress();

  const [deleting, setDeleting] = useState(false);

  const isSelected =
    selectedAddress?._id === address._id;

  const handleSelectAddress = () => {
    selectAddress(address);
    toast.success("Address selected successfully");
  };

  const handleDeleteAddress = async () => {
    if (!address._id || deleting) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteAddress(address._id);

      toast.success("Address deleted successfully");
    } catch (error) {
      toast.error(
        error.message || "Failed to delete address"
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className={`card h-100 shadow-sm mb-3 ${
        isSelected
          ? "border border-2 border-primary"
          : "border"
      }`}
    >
      <div className="card-body p-3 p-md-4 d-flex flex-column">

        {/* Selection */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="form-check d-flex align-items-center gap-2 mb-0">
            <input
              className="form-check-input mt-0"
              type="radio"
              name="selectedAddress"
              checked={isSelected}
              onChange={handleSelectAddress}
            />

            <label className="form-check-label fw-semibold">
              Deliver Here
            </label>
          </div>

          {isSelected && (
            <span className="badge bg-primary">
              Selected
            </span>
          )}
        </div>

        {/* Address Details */}
        <div className="mb-3">
          <h6 className="fw-bold mb-2">
            {address.name}
          </h6>

          <div className="text-muted small lh-lg">
            <p className="mb-1">
              {address.street}
            </p>

            <p className="mb-1">
              {address.city}, {address.state}
            </p>

            <p className="mb-1">
              {address.country} - {address.pincode}
            </p>
          </div>

          <div className="mt-2 small">
            <span className="text-muted">
              Phone:
            </span>{" "}
            <span className="fw-semibold">
              {address.phone}
            </span>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="d-flex align-items-center gap-2 mt-auto pt-3 border-top">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary px-3"
              onClick={() => onEdit?.(address)}
            >
              Edit
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger px-3"
              onClick={handleDeleteAddress}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
