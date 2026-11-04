// import { useEffect } from "react";

// import { Link } from "react-router-dom";
// import Navbar from "../../components/Navbar/Navbar";

// import ProductGrid from "../../components/ProductGrid/ProductGrid";
// import { useProducts } from "../../context/ProductContext";
// import { useSearch } from "../../context/SearchContext";

// import { filterProducts } from "../../utils/filterProducts";

// const Home = () => {
//   const categories = [
//     {
//       id: 1,
//       name: "Men",
//       image:
//         "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
//     },
//     {
//       id: 2,
//       name: "Women",
//       image:
//         "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
//     },
//     {
//       id: 3,
//       name: "Kids",
//       image:
//         "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600",
//     },
//     {
//       id: 4,
//       name: "Electronics",
//       image:
//         "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
//     },
//     {
//       id: 5,
//       name: "Home",
//       image:
//         "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
//     },
//   ];

//   const { state: productState, fetchProducts } = useProducts();

//   const { state: searchState } = useSearch();

//   useEffect(() => {
//     fetchProducts();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const filteredProducts = filterProducts(
//     productState.products,
//     productState,
//     searchState.search,
//   );

//   if (productState.loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="container py-5 text-center">
//           <h3>Loading Products...</h3>
//         </div>
//       </>
//     );
//   }
//   if (productState.error) {
//     return (
//       <>
//         <Navbar />
//         <div className="container py-5 text-center">
//           <h3>{productState.error}</h3>
//         </div>
//       </>
//     );
//   }
//   return (
//     <>
//       <Navbar />

//       {searchState.search.trim() ? (
//         // <div ref={searchSectionRef} className="container py-5">

//         <div className="col-12 bg-light py-5 px-5">
//          <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
//   <div>
//     <h2 className="fw-bold mb-0">Search Results</h2>

//     <small className="text-muted">
//       Results for "<strong>{searchState.search}</strong>"
//     </small>
//   </div>

//   <span className="badge bg-dark fs-6 px-3 py-2">
//     {filteredProducts.length} Products
//   </span>
// </div>

// {filteredProducts.length === 0 ? (
//   <div className="text-center py-5">
//     <i className="bi bi-search display-1 text-secondary"></i>

//     <h3 className="mt-3">No Products Found</h3>

//     <p className="text-muted">
//       We couldn't find any products matching
//       <strong> "{searchState.search}"</strong>.
//     </p>
//   </div>
// ) : (
//   <ProductGrid products={filteredProducts} />
// )}
//         </div>
//       ) : (
//         <div className="container py-5">
//           {/* Categories */}

//           <div className="row g-4 mb-5">
//             {categories.map((category) => (
//               <div className="col-lg col-md-4 col-6" key={category.id}>
//                 <Link
//                   to={`/products?category=${category.name}`}
//                   className="text-decoration-none text-dark"
//                 >
//                   <div className="card border-0 shadow-sm">
//                     <img
//                       src={category.image}
//                       className="card-img-top"
//                       style={{
//                         height: "110px",
//                         objectFit: "cover",
//                       }}
//                     />

//                     <div className="card-body text-center py-2">
//                       <h6 className="fw-semibold mb-0">{category.name}</h6>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>

//           {/* Hero Banner */}

//           <div
//             className="rounded overflow-hidden position-relative mb-5"
//             style={{ height: "500px" }}
//           >
//             <img
//               src="/images/hero-banner.png"
//               className="w-100 h-100"
//               alt=""
//               style={{ objectFit: "cover" }}
//             />

//             <div
//               className="position-absolute top-50 start-0 translate-middle-y ps-5"
//               style={{ maxWidth: "500px" }}
//             >
//               <span className="badge bg-dark mb-3 fs-6">
//                 New Collection 2026
//               </span>

//               <h1 className="display-4 fw-bold">
//                 Discover Your
//                 <br />
//                 Perfect Style
//               </h1>

//               <p className="lead text-secondary">
//                 <strong>
//                 Shop premium fashion, electronics and home essentials with
//                 exciting offers.
//                 </strong>
//               </p>

//               <Link to="/products" className="btn btn-dark btn-lg px-5 mt-2">
//                 Shop Now
//               </Link>
//             </div>
//           </div>

//           {/* Summer & Latest Fashion */}

//           <div className="row g-4">
//             {[1, 2].map((item) => (
//               <div className="col-lg-6" key={item}>
//                 <div className="card border-0 bg-secondary-subtle h-100">
//                   <div className="card-body">
//                     <div className="row align-items-center">
//                       <div className="col-4">
//                         <img
//                           src={
//                             item === 1
//                               ? "/images/new-arrival.png"
//                               : "/images/summer-collection.png"
//                           }
//                           className="img-fluid rounded"
//                           style={{
//                             height: "170px",
//                             width: "100%",
//                             objectFit: "cover",
//                           }}
//                           alt=""
//                         />
//                       </div>

//                       <div className="col-8">
//                         <small className="text-uppercase text-muted">
//                           {item === 1 ? "Summer Sale" : "New Arrivals"}
//                         </small>

//                         <h2 className="fw-bold mt-2">
//                           {item === 1 ? "Summer Collection" : "Latest Fashion"}
//                         </h2>

//                         <p className="text-secondary mb-3">
//                           {item === 1
//                             ? "Refresh your wardrobe with stylish summer outfits at exclusive discounts."
//                             : "Explore the newest arrivals in fashion, footwear and accessories at exclusive discounts."}
//                         </p>

//                         <Link
//                           to={
//                             item === 1
//                               ? "/products?category=Women"
//                               : "/products"
//                           }
//                           className="btn btn-dark"
//                         >
//                           Shop Now
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Home;
// -------------------------------------------------------------------------------

import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { useProducts } from "../../context/ProductContext";
import { useSearch } from "../../context/SearchContext";
import { filterProducts } from "../../utils/filterProducts";
import "./Home.css";

const categories = [
  {
    id: 1,
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
  },
  {
    id: 2,
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
  },
  {
    id: 3,
    name: "Kids",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600",
  },
  {
    id: 4,
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
  },
  {
    id: 5,
    name: "Home",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
  },
];

const Home = () => {
  const { state: productState, fetchProducts } = useProducts();
  const { state: searchState } = useSearch();

  useEffect(() => {
    fetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProducts = filterProducts(
    productState.products,
    productState,
    searchState.search
  );

  if (productState.loading) {
    return (
      <>
        <Navbar />
        <div className="container home-status">
          <div className="text-center">
            <div
              className="spinner-border text-dark mb-3"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="mb-0">Loading Products...</h5>
          </div>
        </div>
      </>
    );
  }

  if (productState.error) {
    return (
      <>
        <Navbar />
        <div className="container home-status">
          <div className="alert alert-warning text-center mb-0">
            {productState.error}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {searchState.search.trim() ? (
        <main className="container home-search-section">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 border-bottom pb-3 mb-4">
            <div>
              <h2 className="fw-bold mb-1">Search Results</h2>
              <p className="text-muted mb-0">
                Results for{" "}
                <strong>"{searchState.search}"</strong>
              </p>
            </div>

            <span className="badge bg-dark fs-6 px-3 py-2 align-self-start align-self-sm-center">
              {filteredProducts.length} Products
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-search display-1 text-secondary"></i>

              <h3 className="mt-3 fw-semibold">
                No Products Found
              </h3>

              <p className="text-muted mb-0">
                We couldn't find any products matching{" "}
                <strong>"{searchState.search}"</strong>.
              </p>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </main>
      ) : (
        <main className="container home-page py-4 py-lg-5">
          {/* Categories */}
          <section className="home-categories mb-4 mb-lg-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 className="fw-bold mb-1">Shop by Category</h4>
                <p className="text-muted small mb-0">
                  Explore our collections
                </p>
              </div>
            </div>

            <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 g-3">
              {categories.map((category) => (
                <div className="col" key={category.id}>
                  <Link
                    to={`/products?category=${category.name}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="card border-0 shadow-sm h-100 home-category-card">
                      <img
                        src={category.image}
                        className="card-img-top home-category-image"
                        alt={`${category.name} collection`}
                        loading="lazy"
                      />

                      <div className="card-body text-center py-3">
                        <h6 className="fw-semibold mb-0">
                          {category.name}
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Hero Banner */}
          <section className="home-hero position-relative rounded overflow-hidden mb-4 mb-lg-5">
            <img
              src="/images/hero-banner.png"
              className="home-hero-image"
              alt="Discover the latest Trendora collection"
            />

            <div className="home-hero-content position-absolute top-50 start-0 translate-middle-y">
              <span className="badge bg-dark mb-3 home-hero-badge">
                New Collection 2026
              </span>

              <h1 className="fw-bold home-hero-title">
                Discover Your
                <br />
                Perfect Style
              </h1>

              <p className="text-secondary home-hero-description">
                <strong>
                  Shop premium fashion, electronics and home essentials
                  with exciting offers.
                </strong>
              </p>

              <Link
                to="/products"
                className="btn btn-dark btn-lg px-4 px-md-5 mt-2"
              >
                Shop Now
              </Link>
            </div>
          </section>

          {/* Promotional Collections */}
          <section className="home-promotions">
            <div className="row g-3 g-lg-4">
              {[1, 2].map((item) => (
                <div className="col-12 col-lg-6" key={item}>
                  <div className="card border-0 bg-secondary-subtle h-100 home-promo-card">
                    <div className="card-body p-3 p-md-4">
                      <div className="row align-items-center g-3">
                        <div className="col-5 col-sm-4">
                          <img
                            src={
                              item === 1
                                ? "/images/new-arrival.png"
                                : "/images/summer-collection.png"
                            }
                            className="img-fluid rounded home-promo-image"
                            alt={
                              item === 1
                                ? "Summer collection"
                                : "Latest fashion arrivals"
                            }
                            loading="lazy"
                          />
                        </div>

                        <div className="col-7 col-sm-8">
                          <small className="text-uppercase text-muted fw-semibold">
                            {item === 1 ? "Summer Sale" : "New Arrivals"}
                          </small>

                          <h3 className="fw-bold home-promo-title mt-2">
                            {item === 1
                              ? "Summer Collection"
                              : "Latest Fashion"}
                          </h3>

                          <p className="text-secondary small home-promo-description">
                            {item === 1
                              ? "Refresh your wardrobe with stylish summer outfits at exclusive discounts."
                              : "Explore the newest arrivals in fashion, footwear and accessories at exclusive discounts."}
                          </p>

                          <Link
                            to={
                              item === 1
                                ? "/products?category=Women"
                                : "/products"
                            }
                            className="btn btn-dark btn-sm px-3"
                          >
                            Shop Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Home;

 