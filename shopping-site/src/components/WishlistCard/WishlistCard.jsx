// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useWishlist } from "../../context/WishlistContext";
// import { useCart } from "../../context/CartContext";
// const WishlistCard = ({ product }) => {
//   const { removeWishlist } = useWishlist();

//   const { state: cartState, dispatch: cartDispatch } = useCart();

//   const isCart = cartState.cart.some((item) => item._id === product._id);

//   const removeWishlistHandler = async () => {
//     await removeWishlist(product._id);
//     toast.success("Product removed from wishlist.");
//   };
//   // const {
//   //     dispatch: wishlistDispatch,
//   // } = useWishlist();

//   // const removeWishlistHandler = () => {

//   //     wishlistDispatch({

//   //         type: "REMOVE_FROM_WISHLIST",

//   //         payload: product._id,

//   //     });

//   // };

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

//         <button
//           className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow-sm"
//           onClick={removeWishlistHandler}
//         >
//           <i className="bi bi-heart-fill text-danger fs-5"></i>
//         </button>
//       </div>

//       <div className="card-body text-center">
//         <h5>{product.title}</h5>

//         <h3 className="fw-bold">₹{product.price}</h3>
//       </div>

//       <div className="card-footer border-0 bg-white">
//         <div className="card-footer bg-white border-0 p-0">
//           {isCart ? (
//             <Link to="/cart" className="btn btn-primary w-100 rounded-0">
//               Go To Cart
//             </Link>
//           ) : (
//             <button
//               className="btn btn-secondary w-100 rounded-0"
//               onClick={() => {
//                 cartDispatch({
//                   type: "ADD_TO_CART",
//                   payload: product,
//                 });
//                 toast.success("add to cart successfully");
//               }}
//             >
//               Add To Cart
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WishlistCard;
// -------------------------------------------------------------------------------



import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const WishlistCard = ({ product }) => {
  const { removeWishlist } = useWishlist();

  const {
    state: cartState,
    addProductToCart,
  } = useCart();

  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Backend cart item structure:
  // { product: { _id, title, price, image }, quantity }
  const isCart = cartState.cart.some(
    (item) => item.product?._id === product._id
  );

  const removeWishlistHandler = async () => {
    if (wishlistLoading) return;

    setWishlistLoading(true);

    try {
      await removeWishlist(product._id);
      toast.success("Product removed from wishlist.");
    } catch (error) {
      toast.error(
        error?.message || "Unable to remove product from wishlist."
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
        toast.error(result?.message || "Unable to add product to cart.");
        return;
      }

      toast.success(result.message || "Product added to cart successfully.");
    } catch (error) {
      toast.error(
        error?.message || "Unable to add product to cart."
      );
    } finally {
      setCartLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="position-relative bg-light">
        <Link to={`/products/${product._id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="card-img-top p-4"
            style={{
              height: "320px",
              objectFit: "contain",
            }}
          />
        </Link>

        <button
          type="button"
          className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow-sm"
          onClick={removeWishlistHandler}
          disabled={wishlistLoading}
          aria-label="Remove from wishlist"
        >
          {wishlistLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <i className="bi bi-heart-fill text-danger fs-5" />
          )}
        </button>
      </div>

      <div className="card-body text-center">
        <h5>{product.title}</h5>

        <h3 className="fw-bold">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </h3>
      </div>

      <div className="card-footer border-0 bg-white p-0">
        {isCart ? (
          <Link
            to="/cart"
            className="btn btn-primary w-100 rounded-0"
          >
            Go To Cart
          </Link>
        ) : (
          <button
            type="button"
            className="btn btn-secondary w-100 rounded-0"
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

export default WishlistCard;
