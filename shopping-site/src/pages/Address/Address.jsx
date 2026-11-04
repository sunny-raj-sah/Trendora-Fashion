// import { useState } from "react";

// import Navbar from "../../components/Navbar/Navbar";
// import AddressCard from "../../components/AddressCard/AddressCard";
// import AddressForm from "../../components/AddressForm/AddressForm";

// import { useAddress } from "../../context/AddressContext";
// import { toast } from "react-toastify";
// const Address = () => {
//   const { state: addressState } = useAddress();

//   const [showForm, setShowForm] = useState(false);
// const [editingAddress, setEditingAddress] = useState(null);


// const handleEdit = (address) => {
//    setEditingAddress(address);
//        toast.success("Edit the address");
//     setShowForm(true); };
//   return (
//     <>
//       <Navbar />

//       <div className="container py-5">

//         <div className="d-flex justify-content-between align-items-center mb-4">

//           <h2>My Addresses</h2>

//           <button
//             className="btn btn-dark"
//             // onClick={() => setShowForm(true)}
//             onClick={() => { setEditingAddress(null); setShowForm(true);

//                toast.success("Add new Adress");
//              }}
//           >
//             + Add New Address
//           </button>

//         </div>

//         {showForm && (
//           <AddressForm
//             // onClose={() => setShowForm(false)}
//             editAddress={editingAddress} 
//             onClose={() => {
//                setShowForm(false); 
//               setEditingAddress(null); }}
//           />
//         )}

//         {addressState.addresses.length === 0 ? (

//           <div className="text-center mt-5">

//             <h4>No Address Added</h4>

//             <p className="text-muted">
//               Click on "Add New Address" to save one.
//             </p>

//           </div>

//         ) : (

//           addressState.addresses.map((address) => (
//             <AddressCard
//               // key={address.id}
//               // address={address}
//               key={address.id}
//                address={address}
//               onEdit={handleEdit}
//             />
//           ))

//         )}

//       </div>
//     </>
//   );
// };

// export default Address;

// ---------------------------------------------------------


import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Navbar from "../../components/Navbar/Navbar";
import AddressCard from "../../components/AddressCard/AddressCard";
import AddressForm from "../../components/AddressForm/AddressForm";

import { useAddress } from "../../context/AddressContext";

const Address = () => {
  const {
    addresses,
    loading,
    error,
    fetchAddresses,
  } = useAddress();

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // FETCH ADDRESSES
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchAddresses().catch(() => {});
    }
  }, [fetchAddresses]);

  // OPEN ADD ADDRESS FORM
  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  // OPEN EDIT ADDRESS FORM
  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  // CLOSE FORM
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  // RETRY FETCH
  const handleRetry = async () => {
    try {
      await fetchAddresses();
      toast.success("Your addresses have been loaded successfully.");
    } catch (error) {
      toast.error(
        error.message || "Unable to load your addresses. Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-4 py-md-5">

        {/* PAGE HEADER */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
          <div>
            <h2 className="fw-bold mb-1">My Addresses</h2>
            <p className="text-muted mb-0">
              Manage your saved delivery addresses.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-dark px-4 align-self-start align-self-sm-auto"
            onClick={handleAddAddress}
          >
            + Add New Address
          </button>
        </div>

        {/* ADDRESS FORM */}
        {showForm && (
          <AddressForm
            key={editingAddress?._id || "new-address"}
            editAddress={editingAddress}
            onClose={handleCloseForm}
          />
        )}

        {/* LOADING */}
        {loading && addresses.length === 0 && (
          <div className="text-center py-5">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

            <p className="text-muted mt-3 mb-0">
              Loading your saved addresses...
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && addresses.length === 0 && (
          <div className="alert alert-danger mt-4">
            <p className="mb-2">{error}</p>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={handleRetry}
            >
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && addresses.length === 0 && (
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body text-center py-5 px-3">
              <h5 className="fw-bold mb-2">
                No Saved Addresses
              </h5>

              <p className="text-muted mb-4">
                You haven't added a delivery address yet.
                Add your first address to make checkout easier.
              </p>

              <button
                type="button"
                className="btn btn-dark px-4"
                onClick={handleAddAddress}
              >
                + Add Your First Address
              </button>
            </div>
          </div>
        )}

        {/* SAVED ADDRESSES */}
        {addresses.length > 0 && (
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">
                Saved Addresses
              </h5>

              <span className="text-muted small">
                {addresses.length}{" "}
                {addresses.length === 1 ? "Address" : "Addresses"}
              </span>
            </div>

            <div className="row g-3">
              {addresses.map((address) => (
                <div
                  className="col-12 col-md-6 col-lg-6"
                  key={address._id}
                >
                  <AddressCard
                    address={address}
                    onEdit={handleEdit}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Address;
