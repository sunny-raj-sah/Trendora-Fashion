import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";

import AddressCard from "../../components/AddressCard/AddressCard";
import AddressForm from "../../components/AddressForm/AddressForm";

import { useAddress } from "../../context/AddressContext";
import { useOrder } from "../../context/OrderContext";
import { useAuth } from "../../context/AuthContext";


const Profile = () => {

  const [activeTab, setActiveTab] = useState("profile");

  const [showForm, setShowForm] = useState(false);
const [editingAddress, setEditingAddress] = useState(null);

const {
  state: addressState,
  fetchAddresses,
} = useAddress();

  const { state: orderState } = useOrder();
const { state: authState } = useAuth();

const user = authState.user;

  const handleEdit = (address) => { 
    setEditingAddress(address); 
    setShowForm(true); };

    useEffect(() => {
  if (
    activeTab === "addresses" &&
    authState.isAuthenticated
  ) {
    fetchAddresses().catch((error) => {
      console.error("Failed to fetch addresses:", error);
    });
  }
}, [
  activeTab,
  authState.isAuthenticated,
  fetchAddresses,
]);
  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h2 className="mb-4">

          My Account

        </h2>

        {/* Tabs */}

        <ul className="nav nav-pills mb-4">

          <li className="nav-item">

            <button
              className={`nav-link ${
                activeTab === "profile"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("profile")
              }
            >
              Personal Info
            </button>

          </li>

          <li className="nav-item">

            <button
              className={`nav-link ${
                activeTab === "orders"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("orders")
              }
            >
              Orders
            </button>

          </li>

          <li className="nav-item">

            <button
              className={`nav-link ${
                activeTab === "addresses"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("addresses")
              }
            >
              Addresses
            </button>

          </li>

        </ul>

      

     {/* PERSONAL INFO */}

{activeTab === "profile" && (

  <div className="card shadow-sm">

    <div className="card-body">

      <h4 className="mb-4">
        Personal Information
      </h4>

      {user ? (
        <>
          <p>
            <strong>Name :</strong>{" "}
            {user.name || "Not available"}
          </p>

          <p>
            <strong>Email :</strong>{" "}
            {user.email || "Not available"}
          </p>

        {user.phone && (
  <p>
    <strong>Phone :</strong>{" "}
    {user.phone}
  </p>
)}
        </>
      ) : (
        <p className="text-muted">
          Loading profile information...
        </p>
      )}

    </div>

  </div>

)}
        {/* ORDER HISTORY */}

        {activeTab === "orders" && (

          <div>

            {

              orderState.orders.length === 0 ?

              (

                <div className="alert alert-warning">

                  No Orders Found.

                </div>

              )

              :

              orderState.orders.map((order) => (

                <div
                  className="card shadow-sm mb-3"
                  key={order.orderId}
                >

                  <div className="card-body">

                    <h5>

                      Order #{order.orderId}

                    </h5>

                    <p>

                      Date :
                      {" "}
                      {order.orderDate}

                    </p>

                    <p>

                      Items :
                      {" "}
                      {order.totalItems}

                    </p>

                    <h6>

                      ₹{order.totalPrice}

                    </h6>

                  </div>

                </div>

              ))

            }

          </div>

        )}

        {/* ADDRESS */}

        {/* {activeTab === "addresses" && (

          <>

            <button
              className="btn btn-dark mb-4"
              // onClick={() =>
              //   setShowForm(true)
              // }
              onClick={() => {
                 setEditingAddress(null); 
                setShowForm(true); }}
            >
              + Add Address
            </button>

            {

              showForm && (

                <AddressForm
                  // onClose={() =>
                  //   setShowForm(false)
                  // }
                  editAddress={editingAddress} 
                  onClose={() => { setShowForm(false); 
                    setEditingAddress(null);
                    }}
                />

              )

            }

            {

              addressState.addresses.length === 0 ?

              (

                <div className="alert alert-warning">

                  No Address Added.

                </div>

              )

              :

              addressState.addresses.map((address) => (

                <AddressCard
                  key={address._id}
                  // address={address}
                  // key={address.id} 
                  address={address} 
                  onEdit={handleEdit}
                />

              ))

            }

          </>

        )} */}
{/* ADDRESS */}

{activeTab === "addresses" && (
  <>
    <button
      className="btn btn-dark mb-4"
      onClick={() => {
        setEditingAddress(null);
        setShowForm(true);
      }}
    >
      + Add Address
    </button>

    {showForm && (
      <AddressForm
        editAddress={editingAddress}
        onClose={() => {
          setShowForm(false);
          setEditingAddress(null);
        }}
      />
    )}

    {addressState.loading ? (
      <div className="text-center py-4">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-2">Loading addresses...</p>
      </div>
    ) : addressState.error ? (
      <div className="alert alert-danger">
        {addressState.error}
      </div>
    ) : addressState.addresses.length === 0 ? (
      <div className="alert alert-warning">
        No Address Added.
      </div>
    ) : (
      addressState.addresses.map((address) => (
        <AddressCard
          key={address._id}
          address={address}
          onEdit={handleEdit}
        />
      ))
    )}
  </>
)}
      </div>

    </>
  );
};

export default Profile;