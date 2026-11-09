import { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import "./FilterSidebar.css";

const FilterSidebar = () => {
  const { state, dispatch } = useProducts();

  const [showFilters, setShowFilters] = useState(false);
  const [showFilterButton, setShowFilterButton] = useState(true);

  // ==========================
  // Mobile Filter Button Scroll Behavior
  // ==========================

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;

      if (currentScrollY < 100) {
        setShowFilterButton(true);
      } else if (scrollDifference < -5) {
        // Show button when scrolling upward
        setShowFilterButton(true);
      } else if (scrollDifference > 5) {
        // Hide button when scrolling downward
        setShowFilterButton(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ==========================
  // Prevent Background Scrolling
  // While Mobile Filters Are Open
  // ==========================

  useEffect(() => {
    if (!showFilters) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    // Close filters using Escape key
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowFilters(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showFilters]);

  // ==========================
  // Brands
  // ==========================

  const brands = [
    ...new Set(
      (state.products || [])
        .map((product) => product.brand)
        .filter(Boolean)
    ),
  ];

  // ==========================
  // Brand Handler
  // ==========================

  const handleBrandChange = (brand) => {
    const updatedBrands = [...(state.selectedBrand || [])];

    const brandIndex = updatedBrands.indexOf(brand);

    if (brandIndex !== -1) {
      updatedBrands.splice(brandIndex, 1);
    } else {
      updatedBrands.push(brand);
    }

    dispatch({
      type: "SET_BRAND",
      payload: updatedBrands,
    });
  };

  // ==========================
  // Price Calculation
  // ==========================

  const prices = (state.products || [])
    .map((product) => Number(product?.price))
    .filter(
      (price) => Number.isFinite(price) && price >= 0
    );

  const maxPrice = prices.length
    ? Math.max(...prices)
    : 0;

  const currentPrice = Number(state.selectedPrice);

  const sliderPrice =
    Number.isFinite(currentPrice) && currentPrice >= 0
      ? Math.min(currentPrice, maxPrice)
      : maxPrice;

  // ==========================
  // Clear All Filters
  // ==========================

  const handleClearFilters = () => {
    dispatch({
      type: "CLEAR_FILTERS",
    });
  };

  // ==========================
  // Close Mobile Filters
  // ==========================

  const closeFilters = () => {
    setShowFilters(false);
  };

  return (
    <>
      {/* ========================== */}
      {/* Mobile Filter Toggle */}
      {/* ========================== */}

      {showFilterButton && !showFilters && (
        <div className="d-md-none filter-sticky-toggle">
          <button
            type="button"
            className="btn btn-gray"
            onClick={() => setShowFilters(true)}
            aria-label="Open filters"
          >
         <strong> ☰ Filters</strong>  
          </button>
        </div>
      )}

      {/* ========================== */}
      {/* Mobile Background Overlay */}
      {/* ========================== */}

      {showFilters && (
        <div
          className="d-md-none filter-backdrop"
          onClick={closeFilters}
          aria-hidden="true"
        />
      )}

      {/* ========================== */}
      {/* Filter Sidebar */}
      {/* ========================== */}

      <div
        className={`bg-white border-end p-4 filter-sidebar ${
          showFilters ? "mobile-filter-open" : ""
        }`}
        aria-label="Product filters"
        aria-hidden={
          typeof window !== "undefined" &&
          window.innerWidth < 768
            ? !showFilters
            : undefined
        }
      >
        {/* ========================== */}
        {/* Filter Header */}
        {/* ========================== */}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">Filters</h4>

          <div className="d-flex align-items-center gap-2">
            {/* Clear All Filters */}

            <button
              type="button"
              className="btn btn-sm btn-link text-decoration-none"
              onClick={handleClearFilters}
            >
              Clear
            </button>

            {/* Mobile Close Button */}

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary d-md-none"
              onClick={closeFilters}
              aria-label="Close filters"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ========================== */}
        {/* Category / Brand */}
        {/* ========================== */}

        <div className="mb-5">
          <h5 className="fw-bold mb-3">
            Shop by Category
          </h5>

          {brands.map((brand) => (
            <div className="form-check mb-2" key={brand}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`brand-${brand}`}
                checked={(state.selectedBrand || []).includes(
                  brand
                )}
                onChange={() => handleBrandChange(brand)}
              />

              <label
                className="form-check-label"
                htmlFor={`brand-${brand}`}
              >
                {brand}
              </label>
            </div>
          ))}
        </div>

        {/* ========================== */}
        {/* Price Filter */}
        {/* ========================== */}

        <div className="mb-5">
          <h5 className="fw-bold mb-3">Price</h5>

          <div className="d-flex justify-content-between small text-muted">
            <span>₹0</span>

            <span className="fw-semibold text-dark">
              Up to ₹{sliderPrice.toLocaleString("en-IN")}
            </span>

            <span>
              ₹{maxPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <input
            className="form-range mt-2"
            type="range"
            min={0}
            max={maxPrice}
            step={1}
            value={sliderPrice}
            disabled={maxPrice <= 0}
            onChange={(e) => {
              dispatch({
                type: "SET_PRICE",
                payload: Number(e.target.value),
              });
            }}
            aria-label="Maximum product price"
          />

          <div className="d-flex justify-content-between mt-1">
            <small className="text-muted">
              Minimum
            </small>

            <button
              type="button"
              className="btn btn-sm btn-link p-0 text-decoration-none"
              onClick={() =>
                dispatch({
                  type: "SET_PRICE",
                  payload: maxPrice,
                })
              }
              disabled={maxPrice <= 0}
            >
              Reset price
            </button>
          </div>
        </div>

        {/* ========================== */}
        {/* Rating Filter */}
        {/* ========================== */}

        <div className="mb-5">
          <h5 className="fw-bold mb-3">Rating</h5>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              id="rating-all"
              name="rating"
              checked={state.selectedRating === 0}
              onChange={() =>
                dispatch({
                  type: "SET_RATING",
                  payload: 0,
                })
              }
            />

            <label
              className="form-check-label"
              htmlFor="rating-all"
            >
              All Ratings
            </label>
          </div>

          {[4, 3, 2, 1].map((rating) => (
            <div className="form-check mb-2" key={rating}>
              <input
                className="form-check-input"
                type="radio"
                id={`rating-${rating}`}
                name="rating"
                checked={state.selectedRating === rating}
                onChange={() =>
                  dispatch({
                    type: "SET_RATING",
                    payload: rating,
                  })
                }
              />

              <label
                className="form-check-label"
                htmlFor={`rating-${rating}`}
              >
                {rating} ★ & Above
              </label>
            </div>
          ))}
        </div>

        {/* ========================== */}
        {/* Sort Filter */}
        {/* ========================== */}

        <div>
          <h5 className="fw-bold mb-3">Sort By</h5>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              id="sort-low-high"
              name="sort"
              checked={state.sortBy === "LOW_TO_HIGH"}
              onChange={() =>
                dispatch({
                  type: "SET_SORT",
                  payload: "LOW_TO_HIGH",
                })
              }
            />

            <label
              className="form-check-label"
              htmlFor="sort-low-high"
            >
              Price : Low to High
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="sort-high-low"
              name="sort"
              checked={state.sortBy === "HIGH_TO_LOW"}
              onChange={() =>
                dispatch({
                  type: "SET_SORT",
                  payload: "HIGH_TO_LOW",
                })
              }
            />

            <label
              className="form-check-label"
              htmlFor="sort-high-low"
            >
              Price : High to Low
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
