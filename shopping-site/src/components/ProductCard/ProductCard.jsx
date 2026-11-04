// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// import { useWishlist } from "../../context/WishlistContext";
// import { useCart } from "../../context/CartContext";

// const ProductCard = ({ product }) => {
//   const { state: wishlistState, addWishlist, removeWishlist } = useWishlist();

//   const { state: cartState, dispatch: cartDispatch } = useCart();

//   const isWishlist = wishlistState.wishlist.some(
//     (item) => item._id === product._id,
//   );

//   const isCart = cartState.cart.some((item) => item._id === product._id);

//   // ==========================
//   // Wishlist Handler
//   // ==========================
//   const handleWishlist = async () => {
//     if (isWishlist) {
//       await removeWishlist(product._id);
//       toast.success("Product removed from wishlist.");
//     } else {
//       await addWishlist(product._id);
//       toast.success("Product added to wishlist.");
//     }
//   };

//   return (
//     <div className="card border-0 shadow-sm h-100">
//       <div className="position-relative bg-light">
//         <Link to={`/products/${product._id}`}>
//           <img
//             src={product.image}
//             alt={product.title}
//             className="card-img-top p-4"
//             style={{
//               height: "320px",
//               objectFit: "contain",
//             }}
//           />
//         </Link>

//         {/* Wishlist Button */}
//         <button
//           className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow-sm"
//           onClick={handleWishlist}
//         >
//           <i
//             className={`bi ${
//               isWishlist ? "bi-heart-fill text-danger" : "bi-heart"
//             } fs-5`}
//           ></i>
//         </button>
//       </div>

//       <div className="card-body text-center">
//         <h5 className="fw-normal">{product.title}</h5>
//         <div className="mb-2">
//           <span className="badge bg-success px-3 py-2 fs-6">
//             ⭐ {product.rating}
//           </span>
//         </div>
//         <h2 className="fw-bold">₹{product.price}</h2>
//       </div>

//       <div className="card-footer bg-white border-0 p-0">
//         {isCart ? (
//           <Link to="/cart" className="btn btn-primary w-100 rounded-0">
//             Go To Cart
//           </Link>
//         ) : (
//           <button
//             className="btn btn-secondary w-100 rounded-0"
//             onClick={() => {
//               cartDispatch({
//                 type: "ADD_TO_CART",
//                 payload: product,
//               });
//               toast.success("add to cart successfully");
//             }}
//           >
//             Add To Cart
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
// ----------------------------------------------------
  
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useWishlist } from "../../context/WishlistContext";
// import { useCart } from "../../context/CartContext";
// import { useAuth } from "../../context/AuthContext";

// const ProductCard = ({ product }) => {
//   const {
//     state: wishlistState,
//     addWishlist,
//     removeWishlist,
//   } = useWishlist();

//   const { state: cartState, dispatch: cartDispatch } = useCart();
//   const { state: authState } = useAuth();

//   const isLoggedIn = Boolean(
//     authState.token || localStorage.getItem("token")
//   );

//   const isWishlist = wishlistState.wishlist.some(
//     (item) => item._id === product._id
//   );

//   const isCart = cartState.cart.some(
//     (item) => item._id === product._id
//   );

//   // Login required for wishlist actions
//   const handleWishlist = async () => {
//     if (!isLoggedIn) {
//       toast.success("Please login now to use your wishlist.");
//       return;
//     }

//     try {
//       if (isWishlist) {
//         await removeWishlist(product._id);
//         toast.success("Product removed from wishlist.");
//       } else {
//         await addWishlist(product._id);
//         toast.success("Product added to wishlist.");
//       }
//     } catch (error) {
//       toast.error(
//         error?.message || "Unable to update wishlist."
//       );
//     }
//   };

//   // Cart works without login
//   const handleAddToCart = () => {
//     cartDispatch({
//       type: "ADD_TO_CART",
//       payload: product,
//     });

//     toast.success("Product added to cart successfully.");
//   };

//   return (
//     <div className="card border-0 shadow-sm h-100">
//       {/* Product Image and Wishlist */}
//       <div className="position-relative bg-light">
//         <Link to={`/products/${product._id}`}>
//           <img
//             src={product.image}
//             alt={product.title}
//             className="card-img-top p-4"
//             style={{
//               height: "320px",
//               objectFit: "contain",
//             }}
//           />
//         </Link>

//         <button
//           type="button"
//           className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow-sm"
//           onClick={handleWishlist}
//           aria-label={
//             isWishlist
//               ? "Remove from wishlist"
//               : "Add to wishlist"
//           }
//         >
//           <i
//             className={`bi ${
//               isWishlist
//                 ? "bi-heart-fill text-danger"
//                 : "bi-heart"
//             } fs-5`}
//           />
//         </button>
//       </div>

//       {/* Product Details */}
//       <div className="card-body text-center">
//         <h5 className="fw-normal">{product.title}</h5>

//         <div className="mb-2">
//           <span className="badge bg-success px-3 py-2 fs-6">
//             ⭐ {product.rating}
//           </span>
//         </div>

//         <h2 className="fw-bold">
//           ₹{Number(product.price).toLocaleString("en-IN")}
//         </h2>
//       </div>

//       {/* Cart Action */}
//       <div className="card-footer bg-white border-0 p-0">
//         {isCart ? (
//           <Link
//             to="/cart"
//             className="btn btn-primary w-100 rounded-0"
//           >
//             Go To Cart
//           </Link>
//         ) : (
//           <button
//             type="button"
//             className="btn btn-secondary w-100 rounded-0"
//             onClick={handleAddToCart}
//           >
//             Add To Cart
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
// -------------------------------------------------------------------------------------------------------------
 
// new


import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const ProductCard = ({ product }) => {
  const {
    state: wishlistState,
    addWishlist,
    removeWishlist,
  } = useWishlist();

  const {
    state: cartState,
    addProductToCart,
  } = useCart();

  const { state: authState } = useAuth();

  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const isLoggedIn = Boolean(
    authState.token || localStorage.getItem("token")
  );

  const isWishlist = wishlistState.wishlist.some(
    (item) => item._id === product._id
  );

  const isCart = cartState.cart.some(
    (item) => item.product?._id === product._id
  );

  // Wishlist action
  const handleWishlist = async () => {
    if (!isLoggedIn) {
      toast.info("Please login to use your wishlist.");
      return;
    }

    if (wishlistLoading) return;

    setWishlistLoading(true);

    try {
      if (isWishlist) {
        await removeWishlist(product._id);
        toast.success("Product removed from wishlist.");
      } else {
        await addWishlist(product._id);
        toast.success("Product added to wishlist.");
      }
    } catch (error) {
      toast.error(
        error?.message || "Unable to update wishlist."
      );
    } finally {
      setWishlistLoading(false);
    }
  };

  // Add product using backend Cart API
  const handleAddToCart = async () => {
    if (cartLoading) return;

    setCartLoading(true);

    try {
      const result = await addProductToCart(product._id);

      if (!result?.success) {
        toast.error(
          result?.message || "Unable to add product to cart."
        );
        return;
      }

      toast.success(
        result.message || "Product added to cart successfully."
      );
    } catch (error) {
      toast.error(
        error?.message || "Unable to add product to cart."
      );
    } finally {
      setCartLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm h-100 rounded-3 overflow-hidden">

      {/* Product Image and Wishlist */}
      <div className="position-relative bg-light">

        <Link
          to={`/products/${product._id}`}
          className="d-flex align-items-center justify-content-center"
          style={{ height: "280px" }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid p-4"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Wishlist Button */}
        <button
          type="button"
          className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow-sm d-flex align-items-center justify-content-center"
          style={{
            width: "42px",
            height: "42px",
          }}
          onClick={handleWishlist}
          disabled={wishlistLoading}
          aria-label={
            isWishlist
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          {wishlistLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <i
              className={`bi ${
                isWishlist
                  ? "bi-heart-fill text-danger"
                  : "bi-heart"
              } fs-5`}
            />
          )}
        </button>
      </div>

      {/* Product Details */}
      <div className="card-body text-center d-flex flex-column px-3 py-4">

        <h5
          className="fw-normal mb-3"
          style={{
            minHeight: "48px",
            lineHeight: "1.5",
          }}
        >
          {product.title}
        </h5>

        <div className="mb-3">
          <span className="badge bg-success px-3 py-2">
            ⭐ {product.rating}
          </span>
        </div>

        <h3 className="fw-bold mb-0 mt-auto">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </h3>

      </div>

      {/* Cart Action */}
      <div className="card-footer bg-white border-0 p-0">

        {isCart ? (
          <Link
            to="/cart"
            className="btn btn-primary w-100 rounded-0 py-3 fw-semibold"
          >
            Go To Cart
          </Link>
        ) : (
          <button
            type="button"
            className="btn btn-secondary w-100 rounded-0 py-3 fw-semibold"
            onClick={handleAddToCart}
            disabled={cartLoading}
          >
            {cartLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                Adding...
              </>
            ) : (
              "Add To Cart"
            )}
          </button>
        )}

      </div>
    </div>
  );
};

export default ProductCard;
