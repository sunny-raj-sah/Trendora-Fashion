// import { Link } from "react-router-dom";
// import { useCart } from "../../context/CartContext";

// const PriceDetails = () => {
//   const { state: cartState } = useCart();

//   // Total Items

//   const totalItems = cartState.cart.reduce(
//     (total, item) => total + item.quantity,

//     0,
//   );

//   // Total Price

//   const totalPrice = cartState.cart.reduce(
//     (total, item) => total + item.price * item.quantity,

//     0,
//   );

//   // Discount (20%)

//   const discount = Math.floor(totalPrice * 0.2);

//   // Final Price

//   const finalPrice = totalPrice - discount;

//   return (
//     <div className="card shadow-sm border-0">
//       <div className="card-body">
//         <h4 className="fw-bold mb-4">PRICE DETAILS</h4>

//         <div className="d-flex justify-content-between mb-3">
//           <span>Price ({totalItems} items)</span>

//           <span>₹{totalPrice}</span>
//         </div>

//         <div className="d-flex justify-content-between mb-3 text-success">
//           <span>Discount</span>

//           <span>- ₹{discount}</span>
//         </div>

//         <div className="d-flex justify-content-between mb-3">
//           <span>Delivery Charges</span>

//           <span className="text-success">FREE</span>
//         </div>

//         <hr />

//         <div className="d-flex justify-content-between fw-bold fs-5">
//           <span>Total Amount</span>

//           <span>₹{finalPrice}</span>
//         </div>

//         <hr />

//         <p className="text-success fw-bold">
//           You will save ₹{discount} on this order.
//         </p>

//         <Link to="/checkout" className="btn btn-dark w-100">
//           Checkout
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PriceDetails;
// ----------------------------------------------------------------------------


import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const PriceDetails = () => {

  const { state: cartState } = useCart();

  // ===========================
  // Total Items
  // ===========================
  const totalItems = cartState.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // ===========================
  // Total Price
  // ===========================
  const totalPrice = cartState.cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  // ===========================
  // Discount (20%)
  // ===========================
  const discount = Math.floor(totalPrice * 0.2);

  // ===========================
  // Final Price
  // ===========================
  const finalPrice = totalPrice - discount;

  return (

    <div className="card shadow-sm border-0">

      <div className="card-body">

        <h4 className="fw-bold mb-4">
          PRICE DETAILS
        </h4>

        {/* Total Items */}
        <div className="d-flex justify-content-between mb-3">

          <span>
            Price ({totalItems} items)
          </span>

          <span>
            {/* ₹{totalPrice} */}
            ₹{totalPrice.toLocaleString("en-IN")}
          </span>

        </div>

        {/* Discount */}
        <div className="d-flex justify-content-between mb-3 text-success">

          <span>
            Discount
          </span>

          <span>
            {/* - ₹{discount} */}
            ₹{discount.toLocaleString("en-IN")}
          </span>

        </div>

        {/* Delivery Charges */}
        <div className="d-flex justify-content-between mb-3">

          <span>
            Delivery Charges
          </span>

          <span className="text-success">
            FREE
          </span>

        </div>

        <hr />

        {/* Final Amount */}
        <div className="d-flex justify-content-between fw-bold fs-5">

          <span>
            Total Amount
          </span>

          <span>
            {/* ₹{finalPrice} */}
            ₹{finalPrice.toLocaleString("en-IN")}
          </span>

        </div>

        <hr />

        {/* Savings */}
        <p className="text-success fw-bold">

          {/* You will save ₹{discount} on this order. */}
          You will save ₹{discount.toLocaleString("en-IN")} on this order.
        </p>

        {/* Checkout */}
        <Link
          to="/checkout"
          className={`btn btn-dark w-100 ${
            totalItems === 0 ? "disabled" : ""
          }`}
          aria-disabled={totalItems === 0}
          onClick={(e) => {
            if (totalItems === 0) {
              e.preventDefault();
            }
          }}
        >
          Checkout
        </Link>

      </div>

    </div>

  );
};

export default PriceDetails;
