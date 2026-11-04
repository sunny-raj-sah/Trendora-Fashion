// import { useCart } from "../../context/CartContext";
// import { useWishlist } from "../../context/WishlistContext";
// import { toast } from "react-toastify";

// const CartItem = ({ product }) => {
//   const { dispatch: cartDispatch } = useCart();

//   const { state: wishlistState, addWishlist, removeWishlist } = useWishlist();

//   const isWishlist = wishlistState.wishlist.some(
//     (item) => item._id === product._id,
//   );

//   // Wishlist Handler
//   const handleWishlist = async () => {
//     if (isWishlist) {
//       await removeWishlist(product._id);
//       toast.success("Product removed from wishlist");
//     } else {
//       await addWishlist(product._id);
//       toast.success( "Product added to wishlist.");
//     }
//   };
//   return (
//     <div className="card mb-4 shadow-sm border-0">
//       <div className="row g-0">
//         <div className="col-md-4 bg-light">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="img-fluid p-3"
//             style={{
//               height: "250px",

//               objectFit: "contain",
//             }}
//           />
//         </div>

//         <div className="col-md-8">
//           <div className="card-body">
//             <h4>{product.title}</h4>

//             <h5 className="fw-bold">₹{product.price}</h5>

//             <p className="text-decoration-line-through text-secondary">
//               {/* ₹{product.originalPrice} */}
//             </p>

//             <p className="text-success fw-bold">50% OFF</p>

//             <div className="d-flex align-items-center mb-3">
//               <span className="me-3">Quantity</span>

//               <button
//                 className="btn btn-outline-dark btn-sm"
//                 onClick={() => {
//                   cartDispatch({
//                     type: "DECREASE_QUANTITY",

//                     payload: product._id,
//                   });
//                   toast.success("decrease quantity successfully");
//                 }}
//               >
//                 -
//               </button>

//               <span className="mx-3">{product.quantity}</span>

//               <button
//                 className="btn btn-outline-dark btn-sm"
//                 onClick={() => {
//                   cartDispatch({
//                     type: "INCREASE_QUANTITY",

//                     payload: product._id,
//                   });
//                   toast.success("increase quantity successfully");
//                 }}
//               >
//                 +
//               </button>
//             </div>

//             <div className="d-flex gap-3">
//               <button
//                 className="btn btn-outline-secondary"
//                 onClick={() => {
//                   cartDispatch({
//                     type: "REMOVE_FROM_CART",

//                     payload: product._id,
//                   });
//                   toast.success("remove from cart successfully");
//                 }}
//               >
//                 Remove From Cart
//               </button>

//               <button
//                 className={`btn ${
//                   isWishlist ? "btn-danger" : "btn-outline-danger"
//                 }`}
//                 onClick={handleWishlist}
//               >
//                 {isWishlist ? "Remove Wishlist" : "Add Wishlist"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartItem;
// ---------------------------------------------------------------------------



import { useState } from "react";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { toast } from "react-toastify";
 // Spinner
  const Spinner = () => (
    <span
      className="spinner-border spinner-border-sm me-2"
      role="status"
      aria-hidden="true"
    />
  );
const CartItem = ({ product }) => {

  const [loadingAction, setLoadingAction] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const {
    changeCartQuantity,
    deleteCartItem,
  } = useCart();

  const {
    state: wishlistState,
    addWishlist,
    removeWishlist,
  } = useWishlist();

  const productDetails = product.product;
  const productId = productDetails._id;

  const isWishlist = wishlistState.wishlist.some(
    (item) => item._id === productId
  );



  // ===========================
  // Wishlist Handler
  // ===========================
  const handleWishlist = async () => {

    if (wishlistLoading) return;

    setWishlistLoading(true);

    try {

      if (isWishlist) {

        const result = await removeWishlist(productId);

        if (result?.success === false) {
          toast.error(result.message || "Unable to update wishlist");
          return;
        }

        toast.success("Product removed from wishlist");

      } else {

        const result = await addWishlist(productId);

        if (result?.success === false) {
          toast.error(result.message || "Unable to update wishlist");
          return;
        }

        toast.success("Product added to wishlist");

      }

    } catch (error) {

      toast.error(error.message || "Something went wrong");

    } finally {

      setWishlistLoading(false);

    }
  };

  // ===========================
  // Quantity Handler
  // ===========================
  const handleQuantity = async (action) => {

    if (loadingAction) return;

    if (action === "decrement" && product.quantity <= 1) {
      return;
    }

    setLoadingAction(action);

    try {

      const result = await changeCartQuantity(
        productId,
        action
      );

      if (result.success) {

        toast.success(
          action === "increment"
            ? "Quantity increased successfully"
            : "Quantity decreased successfully"
        );

      } else {

        toast.error(result.message);

      }

    } catch (error) {

      toast.error(error.message || "Something went wrong");

    } finally {

      setLoadingAction(null);

    }
  };

  // ===========================
  // Remove Cart Item
  // ===========================
  const handleRemove = async () => {

    if (loadingAction) return;

    setLoadingAction("remove");

    try {

      const result = await deleteCartItem(productId);

      if (result.success) {
        toast.success("Product removed from cart");
      } else {
        toast.error(result.message);
      }

    } catch (error) {

      toast.error(error.message || "Something went wrong");

    } finally {

      setLoadingAction(null);

    }
  };

 

  return (

    <div className="card mb-4 shadow-sm border-0">

      <div className="row g-0">

        {/* Product Image */}
        <div className="col-md-4 bg-light">

          <img
            src={productDetails.image}
            alt={productDetails.title}
            className="img-fluid p-3"
            style={{
              height: "250px",
              width: "100%",
              objectFit: "contain",
            }}
          />

        </div>

        {/* Product Details */}
        <div className="col-md-8">

          <div className="card-body">

            <h4>{productDetails.title}</h4>

            <h5 className="fw-bold">
              ₹{productDetails.price}
            </h5>

            <p className="text-decoration-line-through text-secondary">
              {/* ₹{productDetails.originalPrice} */}
            </p>

            <p className="text-success fw-bold">
              50% OFF
            </p>

            {/* Quantity */}
            <div className="d-flex align-items-center mb-3">

              <span className="me-3">
                Quantity
              </span>

              <button
                className="btn btn-outline-dark btn-sm"
                disabled={
                  product.quantity <= 1 ||
                  loadingAction !== null
                }
                onClick={() => handleQuantity("decrement")}
              >
                {loadingAction === "decrement" ? (
                  <Spinner />
                ) : (
                  "-"
                )}
              </button>

              <span className="mx-3">
                {product.quantity}
              </span>

              <button
                className="btn btn-outline-dark btn-sm"
                disabled={loadingAction !== null}
                onClick={() => handleQuantity("increment")}
              >
                {loadingAction === "increment" ? (
                  <Spinner />
                ) : (
                  "+"
                )}
              </button>

            </div>

            {/* Actions */}
            <div className="d-flex gap-3 flex-wrap">

              <button
                className="btn btn-outline-secondary"
                disabled={loadingAction !== null}
                onClick={handleRemove}
              >
                {loadingAction === "remove" ? (
                  <>
                    <Spinner />
                    Removing...
                  </>
                ) : (
                  "Remove From Cart"
                )}
              </button>

              <button
                className={`btn ${
                  isWishlist
                    ? "btn-danger"
                    : "btn-outline-danger"
                }`}
                disabled={wishlistLoading}
                onClick={handleWishlist}
              >
                {wishlistLoading ? (
                  <>
                    <Spinner />
                    Updating...
                  </>
                ) : (
                  isWishlist
                    ? "Remove Wishlist"
                    : "Add Wishlist"
                )}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default CartItem;
