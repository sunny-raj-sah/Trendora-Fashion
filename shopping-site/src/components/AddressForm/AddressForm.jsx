// import { useState } from "react";
// import { useAddress } from "../../context/AddressContext";
// import { toast } from "react-toastify";

// const AddressForm = ({ onClose, editAddress = null }) => {
//   const { dispatch: addressDispatch } = useAddress();

//   const [formData, setFormData] = useState(
//     editAddress || {
//       // eslint-disable-next-line react-hooks/purity
//       id: Date.now(),
//       name: "",
//       phone: "",
//       street: "",
//       city: "",
//       state: "",
//       country: "",
//       pincode: "",
//     }
//   );

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     // Allow only numbers for phone and pincode
//     if (name === "phone") {
//       const onlyNumbers = value.replace(/\D/g, "");

//       // Maximum 10 digits
//       if (onlyNumbers.length <= 10) {
//         setFormData((prev) => ({
//           ...prev,
//           [name]: onlyNumbers,
//         }));
//       }

//       return;
//     }

//     if (name === "pincode") {
//       const onlyNumbers = value.replace(/\D/g, "");

//       // Maximum 6 digits
//       if (onlyNumbers.length <= 6) {
//         setFormData((prev) => ({
//           ...prev,
//           [name]: onlyNumbers,
//         }));
//       }

//       return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Validate phone number
//     if (formData.phone.length !== 10) {
//       toast.error("Phone number must be exactly 10 digits");
//       return;
//     }

//     // Validate pincode
//     if (formData.pincode.length !== 6) {
//       toast.error("Pincode must be exactly 6 digits");
//       return;
//     }

//     addressDispatch({
//       type: editAddress ? "UPDATE_ADDRESS" : "ADD_ADDRESS",
//       payload: formData,
//     });

//     toast.success(
//       editAddress
//         ? "Address updated successfully"
//         : "Address added successfully"
//     );

//     onClose();
//   };

//   return (
//     <div className="card shadow-sm mb-4">
//       <div className="card-body">
//         <h4 className="mb-4">
//           {editAddress ? "Edit Address" : "Add New Address"}
//         </h4>

//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Full Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Phone Number"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 inputMode="numeric"
//                 maxLength="10"
//                 required
//               />
//             </div>
//           </div>

//           <div className="mb-3">
//             <textarea
//               className="form-control"
//               rows="3"
//               placeholder="Street Address"
//               name="street"
//               value={formData.street}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="City"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="State"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Country"
//                 name="country"
//                 value={formData.country}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Pincode"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//                 inputMode="numeric"
//                 maxLength="6"
//                 required
//               />
//             </div>
//           </div>

//           <div className="d-flex gap-3">
//             <button className="btn btn-dark" type="submit">
//               {editAddress ? "Update Address" : "Save Address"}
//             </button>

//             <button
//               type="button"
//               className="btn btn-outline-secondary"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddressForm;
// --------------------------------------------------------


import { useState, useEffect } from "react";
import { useAddress } from "../../context/AddressContext";
import { toast } from "react-toastify";

const initialFormData = {
  name: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
};

const AddressForm = ({ onClose, editAddress = null }) => {
  const { addAddress, updateAddress } = useAddress();

  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  // Populate form when editing an existing address
  // useEffect(() => {
  //   if (editAddress) {
  //     setFormData({
  //       name: editAddress.name || "",
  //       phone: editAddress.phone || "",
  //       street: editAddress.street || "",
  //       city: editAddress.city || "",
  //       state: editAddress.state || "",
  //       country: editAddress.country || "",
  //       pincode: editAddress.pincode || "",
  //     });
  //   } else {
  //     setFormData(initialFormData);
  //   }
  // }, [editAddress]);
  useEffect(() => {
  queueMicrotask(() => {
    if (editAddress) {
      setFormData({
        name: editAddress.name || "",
        phone: editAddress.phone || "",
        street: editAddress.street || "",
        city: editAddress.city || "",
        state: editAddress.state || "",
        country: editAddress.country || "",
        pincode: editAddress.pincode || "",
      });
    } else {
      setFormData({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      });
    }
  });
}, [editAddress]);

  // HANDLE INPUT CHANGES
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Allow only numbers for phone
    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "");

      if (onlyNumbers.length <= 10) {
        setFormData((prev) => ({
          ...prev,
          [name]: onlyNumbers,
        }));
      }

      return;
    }

    // Allow only numbers for pincode
    if (name === "pincode") {
      const onlyNumbers = value.replace(/\D/g, "");

      if (onlyNumbers.length <= 6) {
        setFormData((prev) => ({
          ...prev,
          [name]: onlyNumbers,
        }));
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE FORM SUBMISSION
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    // Validate phone
    if (formData.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    // Validate pincode
    if (formData.pincode.length !== 6) {
      toast.error("Pincode must be exactly 6 digits");
      return;
    }

    try {
      setSubmitting(true);

      if (editAddress) {
        if (!editAddress._id) {
          throw new Error("Invalid address ID");
        }

        await updateAddress(editAddress._id, formData);

        toast.success("Address updated successfully");
      } else {
        await addAddress(formData);

        toast.success("Address added successfully");
      }

      onClose();
    } catch (error) {
      toast.error(
        error.message ||
          `Failed to ${editAddress ? "update" : "add"} address`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-body p-3 p-md-4">

        {/* Form Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="fw-bold mb-1">
              {editAddress ? "Edit Address" : "Add New Address"}
            </h5>

            <p className="text-muted small mb-0">
              {editAddress
                ? "Update your delivery information."
                : "Enter your details to add a new delivery address."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Name and Phone */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">
                Full Name
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">
                Phone Number
              </label>

              <input
                type="tel"
                className="form-control"
                placeholder="10-digit phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel"
                required
              />
            </div>
          </div>

          {/* Street Address */}
          <div className="mb-3">
            <label className="form-label small fw-semibold">
              Street Address
            </label>

            <textarea
              className="form-control"
              rows={3}
              placeholder="House number, building, street, area"
              name="street"
              value={formData.street}
              onChange={handleChange}
              autoComplete="street-address"
              required
            />
          </div>

          {/* City and State */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">
                City
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                autoComplete="address-level2"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">
                State
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                autoComplete="address-level1"
                required
              />
            </div>
          </div>

          {/* Country and Pincode */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">
                Country
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                autoComplete="country-name"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">
                Pincode
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="6-digit pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={6}
                autoComplete="postal-code"
                required
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="d-flex flex-wrap gap-2 pt-3 border-top">
            <button
              className="btn btn-dark px-4"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Please wait..."
                : editAddress
                  ? "Update Address"
                  : "Save Address"}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
