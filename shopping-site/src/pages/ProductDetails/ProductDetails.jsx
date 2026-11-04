 
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/Navbar/Navbar";

import { useProducts } from "../../context/ProductContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const ProductDetails = () => {
  const { productId } = useParams();

  const { state: productState } = useProducts();

  const {
    state: wishlistState,
    addWishlist,
    removeWishlist,
  } = useWishlist();

  const { state: cartState, dispatch: cartDispatch } = useCart();

  const { state: authState } = useAuth();

  const isLoggedIn = Boolean(
    authState.token || localStorage.getItem("token")
  );

  const product = productState.products.find(
    (item) => item._id === productId
  );

  if (productState.loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <h3>Loading Product...</h3>
        </div>
      </>
    );
  }

  if (productState.error) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <h3>{productState.error}</h3>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <h2>Product Not Found</h2>
        </div>
      </>
    );
  }

  const isWishlist = wishlistState.wishlist.some(
    (item) => item._id === product._id
  );

  const isCart = cartState.cart.some(
    (item) => item._id === product._id
  );

  // Wishlist requires login
  const handleWishlist = async () => {
    if (!isLoggedIn) {
      toast.success("Please login first to use your wishlist.");
      return;
    }

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
    }
  };

  // Cart works without login
  const handleAddToCart = () => {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

    toast.success("Product added to cart successfully.");
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-5">
            <div className="bg-light p-4 rounded">
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid"
              />
            </div>
          </div>

          <div className="col-md-7">
            <h2>{product.title}</h2>

            <p className="text-muted">
              {product.description}
            </p>

            <h3 className="fw-bold">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </h3>

            <p>⭐ {product.rating}</p>

            <p>Category: {product.category}</p>

            <div className="d-flex flex-wrap gap-3 mt-4">
              {isCart ? (
                <Link to="/cart" className="btn btn-dark">
                  Go To Cart
                </Link>
              ) : (
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
              )}

              <button
                type="button"
                className={`btn ${
                  isWishlist
                    ? "btn-danger"
                    : "btn-outline-danger"
                }`}
                onClick={handleWishlist}
              >
                {isWishlist
                  ? "Remove Wishlist"
                  : "Add Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
