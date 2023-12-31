import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./style.css";

export default function Viewall() {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [loadingSubcategories, setLoadingSubcategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const productsContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch subcategories
        const subCategoriesResponse = await fetch(
          `https://pranavresidency.com/aptdashboard/aptdashboard/api/get_categorys.php`
        );
        const subCategoriesData = await subCategoriesResponse.json();
        setSubCategories(subCategoriesData.data);
        setLoadingSubcategories(false);

        // Fetch products based on category, sorting, and page
        let apiUrl = "https://pranavresidency.com/aptdashboard/aptdashboard/api/get_products.php";
        apiUrl += `?keywords=${keyword}`;

        apiUrl += `&sortBy=${sortBy}&page=${page}`;

        const productsResponse = await fetch(apiUrl);
        const productsData = await productsResponse.json();

        // Clear existing products when fetching new ones
        if (page === 1) {
          setProducts(productsData.data);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...productsData.data]);
        }

        setPage((prevPage) => prevPage + 1);
        setLoadingProducts(false);

        // Update current category
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch subcategories and products
    fetchData();
  }, [keyword, sortBy, page]);

  const handleSortClick = () => {
    setShowSortOptions((prev) => !prev);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setProducts([]);
    setPage(1);
    setShowSortOptions(false);
  };

  const handleScroll = () => {
    if (
      productsContainerRef.current &&
      productsContainerRef.current.scrollTop +
        productsContainerRef.current.clientHeight ===
        productsContainerRef.current.scrollHeight &&
      !loadingProducts
    ) {
      setLoadingProducts(true);
    }
  };

  useEffect(() => {
    if (productsContainerRef.current) {
      productsContainerRef.current.addEventListener("scroll", handleScroll);
    }

    // Cleanup function
    return () => {
      if (productsContainerRef.current) {
        productsContainerRef.current.removeEventListener(
          "scroll",
          handleScroll
        );
      }
    };
  }, []);

  const renderSubCategories = () => {
    if (loadingSubcategories) {
      return (
        <div className="loading-sub">
          {/* ... (loading skeleton or spinner) */}
          <div className="sub-seleton"></div>
          <div className="sub-seleton"></div>
        </div>
      );
    }

    if (Array.isArray(subCategories) && subCategories.length > 0) {
      return subCategories.map((subCategory) => (
        <Link key={subCategory.id} to={`/${subCategory.name.trim()}`}>
          <div className="category" key={subCategory.id}>
            {subCategory.name}
          </div>
        </Link>
      ));
    } else {
      return <p>No subcategories available.</p>;
    }
  };

  return (
    <>
      <NavBar />

      <div className="path">
        <p className="path-item"> Search Result for - </p>
        <p className="path-item-active"> {keyword}</p>
      </div>

      <div className="categorys">
        {renderSubCategories()}
      </div>

      <div className="sort-tab">
        <button className="sort-text" onClick={handleSortClick}>
          SORT <img src="/assets/sort.png" alt="Sort Icon" />
        </button>
        {showSortOptions && (
          <div className="sort-options">
            <div className="option" onClick={() => handleSortChange("low")}>Low to High</div>
            <div className="option" onClick={() => handleSortChange("high")}>High to Low</div>
            <div className="option" onClick={() => handleSortChange("new")}>New Arrival</div>
          </div>
        )}
      </div>

      <div className="products-sec" ref={productsContainerRef}>
        <div className="products">
          {loadingProducts ? (
            <div className="loading-prod">
              {/* ... (loading skeleton or spinner) */}
              <div className="seleton"></div>
              <div className="seleton"></div>
              <div className="seleton"></div>
              <div className="seleton"></div>
            </div>
          ) : Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <Link to={`../product/${product.unique_title}`} key={product.id}>
                <div key={product.id} className="product">
                  <img
                    src={`https://pranavresidency.com/aptdashboard/aptdashboard/uploads/${product.image1}`}
                    alt={product.title}
                  />
                  <p className="title">{product.title}</p>
                  <p className="price">{`$${product.price}`}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No products available.</p>
          )}
          {loadingProducts && <p></p>}
        </div>
      </div>
    </>
  );
}
