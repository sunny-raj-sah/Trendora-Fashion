 
import { useState ,useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
 
const FilterSidebar = () => {
  const { state, dispatch } = useProducts();

  const [showFilters, setShowFilters] = useState(false);
const [showFilterButton, setShowFilterButton] = useState(true);

useEffect(() => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - lastScrollY;

    if (currentScrollY < 100) {
      setShowFilterButton(true);
    } else if (scrollDifference < -5) {
      setShowFilterButton(true);
    } else if (scrollDifference > 5) {
      setShowFilterButton(false);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);


  // ==========================
  // Brands
  // ==========================
  const brands = [...new Set(state.products.map((product) => product.brand))];

  // const maxPrice = Math.max(
  //   ...state.products.map((product) => product.price),
  //   0
  // );

  // ==========================
  // Brand Handler
  // ==========================
  const handleBrandChange = (brand) => {
    let updatedBrands = [...state.selectedBrand];

    if (updatedBrands.includes(brand)) {
      updatedBrands = updatedBrands.filter((item) => item !== brand);
    } else {
      updatedBrands.push(brand);
    }

    dispatch({
      type: "SET_BRAND",
      payload: updatedBrands,
    });
  };

  return (
    <>
      {/* ========================== */}
      {/* Mobile Filter Toggle */}
      {/* ========================== */}

   
   
{showFilterButton && (
  <div className="d-md-none filter-sticky-toggle">
    <button
      type="button"
      className="btn btn-gray"
      onClick={() => setShowFilters(!showFilters)}
    >
      {showFilters ? "✕ Close Filters" : "☰ Filters"}
    </button>
  </div>
)}

      {/* ========================== */}
      {/* Filter Sidebar */}
      {/* ========================== */}

      <div
        className={`bg-white border-end p-4 ${
          showFilters ? "d-block" : "d-none"
        } d-md-block`}
        style={{
          top: "76px",
          height: "calc(100vh - 76px)",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">Filters</h4>

          <button
            className="btn btn-sm btn-link text-decoration-none"
            onClick={() =>
              dispatch({
                type: "CLEAR_FILTERS",
              })
            }
          >
            Clear
          </button>
        </div>

        {/* ========================= */}
        {/* Category */}
        {/* ========================= */}

        <div className="mb-5">
          <h5 className="fw-bold mb-3">Shop by Category</h5>

          {brands.map((brand) => (
            <div className="form-check mb-2" key={brand}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={state.selectedBrand.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />

              <label className="form-check-label">{brand}</label>
            </div>
          ))}
        </div>

        {/* ========================= */}
        {/* Price */}
        {/* ========================= */}

        {/* <div className="mb-5">
          <h5 className="fw-bold mb-3">Price</h5>

          <div className="d-flex justify-content-between small text-muted">
            <span>₹0</span>

            <span>₹{state.selectedPrice.toLocaleString()}</span>

            <span>₹{maxPrice.toLocaleString()}</span>
          </div>

          <input
            className="form-range mt-2"
            type="range"
            min="0"
            max={maxPrice}
            step="1000"
            value={state.selectedPrice}
            onChange={(e) =>
              dispatch({
                type: "SET_PRICE",
                payload: Number(e.target.value),
              })
            }
          />
        </div> */}

           

{/* Price */}
<div className="mb-5">
  <h5 className="fw-bold mb-3">Price</h5>

  {(() => {
    const prices = state.products
      .map((product) => Number(product?.price))
      .filter(
        (price) => Number.isFinite(price) && price >= 0
      );

    const maxPrice = prices.length
      ? Math.max(...prices)
      : 0;

    const currentPrice = Number(state.selectedPrice);

    const sliderPrice =
      Number.isFinite(currentPrice) &&
      currentPrice >= 0
        ? Math.min(currentPrice, maxPrice)
        : maxPrice;

    return (
      <>
        <div className="d-flex justify-content-between small text-muted">
          <span>₹0</span>

          <span className="fw-semibold text-dark">
            Up to ₹{sliderPrice.toLocaleString("en-IN")}
          </span>

          <span>₹{maxPrice.toLocaleString("en-IN")}</span>
        </div>

        <input
          className="form-range mt-2"
          type="range"
          min={0}
          max={maxPrice}
          step={100}
          value={sliderPrice}
          disabled={maxPrice <= 0}
          onChange={(e) => {
            dispatch({
              type: "SET_PRICE",
              payload: Number(e.target.value),
            });
          }}
        />

        <div className="d-flex justify-content-between mt-1">
          <small className="text-muted">Minimum</small>

          <button
            type="button"
            className="btn btn-sm btn-link p-0 text-decoration-none"
            onClick={() =>
              dispatch({
                type: "SET_PRICE",
                payload: maxPrice,
              })
            }
          >
            Reset price
          </button>
        </div>
      </>
    );
  })()}
</div>



        {/* ========================= */}
        {/* Rating */}
        {/* ========================= */}

        <div className="mb-5">
          <h5 className="fw-bold mb-3">Rating</h5>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="rating"
              checked={state.selectedRating === 0}
              onChange={() =>
                dispatch({
                  type: "SET_RATING",
                  payload: 0,
                })
              }
            />

            <label className="form-check-label">All Ratings</label>
          </div>

          {[4, 3, 2, 1].map((rating) => (
            <div className="form-check mb-2" key={rating}>
              <input
                className="form-check-input"
                type="radio"
                name="rating"
                checked={state.selectedRating === rating}
                onChange={() =>
                  dispatch({
                    type: "SET_RATING",
                    payload: rating,
                  })
                }
              />

              <label className="form-check-label">
                {rating} ★ & Above
              </label>
            </div>
          ))}
        </div>

        {/* ========================= */}
        {/* Sort */}
        {/* ========================= */}

        <div>
          <h5 className="fw-bold mb-3">Sort By</h5>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="sort"
              checked={state.sortBy === "LOW_TO_HIGH"}
              onChange={() =>
                dispatch({
                  type: "SET_SORT",
                  payload: "LOW_TO_HIGH",
                })
              }
            />

            <label className="form-check-label">
              Price : Low to High
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sort"
              checked={state.sortBy === "HIGH_TO_LOW"}
              onChange={() =>
                dispatch({
                  type: "SET_SORT",
                  payload: "HIGH_TO_LOW",
                })
              }
            />

            <label className="form-check-label">
              Price : High to Low
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;

