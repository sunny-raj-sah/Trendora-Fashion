 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import Navbar from "../../components/Navbar/Navbar";
import AddressCard from "../../components/AddressCard/AddressCard";
import AddressForm from "../../components/AddressForm/AddressForm";

import { useCart } from "../../context/CartContext";
import { useAddress } from "../../context/AddressContext";
import { useOrder } from "../../context/OrderContext";

const Checkout = () => {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const {
    state: cartState,
    dispatch: cartDispatch,
  } = useCart();

  // Normalize API cart response
const normalizedCart = cartState.cart.map((item) => {
  const product = item.product || item;

  return {
    id: product._id || product.id,
    title: product.title,
    price: Number(product.price),
    image: product.image,
    quantity: Number(item.quantity),
  };
});

  const {
    state: addressState,
  } = useAddress();

  const {
    dispatch: orderDispatch,
  } = useOrder();

  // Empty Cart Check
  if (cartState.cart.length === 0) {
    return (
      <>
        <Navbar />

        <div className="container py-5 text-center">
          <h3>Your Cart is Empty</h3>

          <button
            className="btn btn-dark mt-3"
            onClick={() =>
               navigate("/products")
               
              
            }
          >
            Continue Shopping
          </button>
        </div>
      </>
    );
  }

  // Total Items
  const totalItems = normalizedCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total Price
  const totalPrice = normalizedCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Place Order
  const handlePlaceOrder = () => {
    if (!addressState.selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }
      const orderId = crypto.randomUUID();

    const order = {
       orderId,

      items:  normalizedCart.map((item) => ({
        ...item,
      })),

      totalItems,

      totalPrice,

      address: {
        ...addressState.selectedAddress,
      },

      orderDate: new Date().toLocaleString(),
    };

    orderDispatch({
      type: "PLACE_ORDER",
      payload: order,
    });
     toast.success("Order placed successfully!");

    cartDispatch({
      type: "CLEAR_CART",
    });

    navigate("/order-success");
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h2 className="mb-4">
          Checkout
        </h2>

        <div className="row">

          {/* LEFT SECTION */}

          <div className="col-lg-8">

            {/* Delivery Address */}

            <div className="card shadow-sm mb-4">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-3">

                  <h4 className="mb-0">
                    Delivery Address
                  </h4>

                  <button
                    className="btn btn-outline-dark"
                    onClick={() => setShowForm(true)}
                  >
                    + Add New Address
                  </button>

                </div>

                {showForm && (
                  <AddressForm
                    onClose={() => setShowForm(false)}
                  />
                )}

                <hr />

                {addressState.addresses.length === 0 ? (

                  <div className="alert alert-warning">

                    No Address Available.
                    <br />
                    Please add a new address.

                  </div>

                ) : (

                  addressState.addresses.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      showActions={false}
                    />
                  ))

                )}

              </div>

            </div>

            {/* Order Items */}

            <div className="card shadow-sm">

              <div className="card-body">

                <h4>
                  Order Items
                </h4>

                <hr />

                { normalizedCart.map((item) => (

                  <div
                    key={item.id}
                    className="d-flex justify-content-between align-items-center mb-3"
                  >

                    <div>

                      <h6 className="mb-1">
                        {item.title}
                      </h6>

                      <small className="text-muted">
                        Quantity : {item.quantity}
                      </small>

                    </div>

                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT SECTION */}

          <div className="col-lg-4">

            <div className="card shadow-sm sticky-top">

              <div className="card-body">

                <h4>
                  Order Summary
                </h4>

                <hr />

                <div className="d-flex justify-content-between mb-3">

                  <span>
                    Total Items
                  </span>

                  <strong>
                    {totalItems}
                  </strong>

                </div>

                <div className="d-flex justify-content-between mb-3">

                  <span>
                    Total Price
                  </span>

                  <strong>
                    ₹{totalPrice}
                  </strong>

                </div>

                <hr />

                <button
                  className="btn btn-dark w-100"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default Checkout;