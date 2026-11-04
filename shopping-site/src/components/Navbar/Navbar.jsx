
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useRef } from "react";

// import { useSearch } from "../../context/SearchContext";
// import { useCart } from "../../context/CartContext";
// import { useWishlist } from "../../context/WishlistContext";
// import { useAuth } from "../../context/AuthContext";

// const Navbar = () => {

//   const navigate = useNavigate();

//   const { state, dispatch } = useSearch();

//   const { state: cartState } = useCart();

//   const { state: wishlistState } = useWishlist();

//   const { state: authState, logout } = useAuth();

//   const searchInputRef = useRef(null);

//   // ===========================
//   // Cart Total Quantity
//   // ===========================
//   const cartCount = cartState.cart.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );

//   // ===========================
//   // Logout
//   // ===========================
//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   // ===========================
//   // Search Input Focus
//   // ===========================
//   useEffect(() => {

//     if (state.search.trim()) {

//       requestAnimationFrame(() => {
//         searchInputRef.current?.focus();
//       });

//     }

//   }, [state.search]);

//   return (

//     <nav className="navbar navbar-expand-lg bg-light border-bottom py-3">

//       <div className="container">

//         {/* Main Navbar Row */}
//         <div className="d-flex align-items-center justify-content-between w-100">

//           {/* Logo */}
//           <Link
//             to="/"
//             className="navbar-brand d-flex align-items-center fw-bold fs-3 text-dark mb-0"
//           >

//             <img
//               src="/Favicon-MP.png"
//               alt="MyShoppingSite Logo"
//               width="42"
//               height="42"
//               className="me-2 rounded-circle"
//             />

//             <span>Trendora</span>

//           </Link>

//           {/* Desktop Search */}
//           <div className="w-50 d-none d-lg-block">

//             <div className="input-group">

//               <span className="input-group-text bg-white">
//                 <i className="bi bi-search"></i>
//               </span>

//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 className="form-control"
//                 placeholder="Search Products..."
//                 value={state.search}
//                 onChange={(e) => {
//                   dispatch({
//                     type: "SET_SEARCH",
//                     payload: e.target.value,
//                   });
//                 }}
//               />

//             </div>

//           </div>

//           {/* Right Side */}
//           <div className="d-flex align-items-center gap-2 gap-md-3">

//             {/* Login / Profile */}
//             {authState.isAuthenticated ? (

//               <div className="dropdown">

//                 <button
//                   className="btn btn-outline-dark dropdown-toggle"
//                   data-bs-toggle="dropdown"
//                 >

//                   <i className="bi bi-person-circle me-2"></i>

//                   <span className="d-none d-md-inline">
//                     {authState.user?.name || "Profile"}
//                   </span>

//                   <span className="d-md-none">
//                     Profile
//                   </span>

//                 </button>

//                 <ul className="dropdown-menu dropdown-menu-end">

//                   <li>
//                     <Link
//                       to="/profile"
//                       className="dropdown-item"
//                     >
//                       <i className="bi bi-person me-2"></i>
//                       Profile
//                     </Link>
//                   </li>

//                   <li>
//                     <hr className="dropdown-divider" />
//                   </li>

//                   <li>
//                     <button
//                       className="dropdown-item text-danger"
//                       onClick={handleLogout}
//                     >
//                       <i className="bi bi-box-arrow-right me-2"></i>
//                       Logout
//                     </button>
//                   </li>

//                 </ul>

//               </div>

//             ) : (

//               <Link
//                 to="/login"
//                 className="btn btn-dark px-3 px-md-4"
//               >
//                 Login
//               </Link>

//             )}

//             {/* Wishlist */}
//             <Link
//               to="/wishlist"
//               className="btn btn-light position-relative px-2"
//             >

//               <i className="bi bi-heart fs-4"></i>

//               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                 {wishlistState.wishlist.length}
//               </span>

//             </Link>

//             {/* Cart */}
//             <Link
//               to="/cart"
//               className="btn btn-light position-relative px-2"
//             >

//               <i className="bi bi-cart3 fs-4"></i>

//               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
//                 {cartCount}
//               </span>

//             </Link>

//           </div>

//         </div>

//         {/* Mobile / Tablet Search */}
//         <div className="w-100 d-lg-none mt-3">

//           <div className="input-group">

//             <span className="input-group-text bg-white">
//               <i className="bi bi-search"></i>
//             </span>

//             <input
//               ref={searchInputRef}
//               type="text"
//               className="form-control"
//               placeholder="Search Products..."
//               value={state.search}
//               onChange={(e) => {
//                 dispatch({
//                   type: "SET_SEARCH",
//                   payload: e.target.value,
//                 });
//               }}
//             />

//           </div>

//         </div>

//       </div>

//     </nav>

//   );
// };

// export default Navbar;
// -------------------------------------------------------------------------------

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import { useSearch } from "../../context/SearchContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useSearch();
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();
  const { state: authState, logout } = useAuth();

  const searchInputRef = useRef(null);

  const cartCount = cartState.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlistState.wishlist.length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    dispatch({
      type: "SET_SEARCH",
      payload: e.target.value,
    });
  };

  useEffect(() => {
    if (state.search.trim()) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [state.search]);

  return (
    <nav className="navbar navbar-light bg-light border-bottom trendora-navbar">
      <div className="container">
        <div className="trendora-navbar-content">

          {/* Logo */}
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center fw-bold text-dark mb-0 trendora-brand"
          >
            <img
              src="/Favicon-MP.png"
              alt="Trendora Logo"
              className="trendora-logo"
            />
            <span>Trendora Fashion</span>
          </Link>

          {/* Desktop Search */}
          <div className="trendora-search trendora-search-desktop">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>

              <input
                ref={searchInputRef}
                type="text"
                className="form-control"
                placeholder="Search Products..."
                value={state.search}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="trendora-actions">

            {/* Profile / Login */}
            {authState.isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-dark dropdown-toggle trendora-profile-btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-2"></i>

                  <span className="trendora-profile-name">
                    {authState.user?.name || "Profile"}
                  </span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      <i className="bi bi-person me-2"></i>
                      Profile
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-dark trendora-login-btn">
                Login
              </Link>
            )}

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="btn btn-light position-relative trendora-icon-btn"
              aria-label={`Wishlist, ${wishlistCount} items`}
            >
              <i className="bi bi-heart"></i>

              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {wishlistCount}
              </span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="btn btn-light position-relative trendora-icon-btn"
              aria-label={`Cart, ${cartCount} items`}
            >
              <i className="bi bi-cart3"></i>

              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile / Tablet Search */}
        <div className="trendora-search trendora-search-mobile">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search Products..."
              value={state.search}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;