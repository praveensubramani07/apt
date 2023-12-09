import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "./style.css";

export default function SubCategory() {
  const { category, subCategory } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(subCategory);
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [loadingSubcategories, setLoadingSubcategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const productsContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch subcategories
        const subCategoriesResponse = await fetch(
          `https://pranavresidency.com/aptdashboard/aptdashboard/api/get_subCat.php?category=${category}`
        );
        const subCategoriesData = await subCategoriesResponse.json();
        setSubCategories(subCategoriesData.data);
        setLoadingSubcategories(false);

        // Fetch products based on category, subcategory, sorting, and page
        let apiUrl =
          "https://pranavresidency.com/aptdashboard/aptdashboard/api/get_products.php";

        if (category && category !== "viewall") {
          apiUrl += `?category=${category}`;
        }

        if (subCategory && subCategory !== "all") {
          apiUrl += `&subCategory=${subCategory}`;
        }

        apiUrl += `&sortBy=${sortBy}&page=${page}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (page === 1) {
          setProducts(data.data);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...data.data]);
        }

        setPage((prevPage) => prevPage + 1);
        setLoadingProducts(false);
        setLoading(false);

        setCurrentCategory(subCategory || category);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch subcategories and products
    fetchData();
  }, [category, subCategory, sortBy, page, currentCategory]);

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
      !loading
    ) {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (productsContainerRef.current) {
      productsContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (productsContainerRef.current) {
        productsContainerRef.current.removeEventListener(
          "scroll",
          handleScroll
        );
      }
    };
  }, [currentCategory, category]);

  const renderSubCategories = () => {
    if (loadingSubcategories) {
      return <p>Loading subcategories...</p>;
    }

    if (Array.isArray(subCategories) && subCategories.length > 0) {
      return subCategories.map((subCategory) =>
        subCategory.sub_category.split(",").map((subcategory) => (
          <Link
            key={subcategory.trim()}
            to={
              subcategory.trim() === "All"
                ? `/${category}`
                : `/${category}/${subcategory.trim()}`
            }
          >
            <div key={subCategory.id} className="category">
              {subcategory.trim()}
            </div>
          </Link>
        ))
      );
    } else {
      return <p>No subcategories available.</p>;
    }
  };

  return (
    <>
      <NavBar />

      <div className="path">
        <Link to={'/'}>
        <p className="path-item">Home /</p>
        </Link>
        <Link to={'/viewall'}>
        <p className="path-item">All Products /</p>
        </Link>
        <Link to={`/${category}`}>
        <p className="path-item">{category} / </p>
        </Link>

        <p className="path-item-active">{currentCategory}</p>
        </div>


      <p className="current-cat">{currentCategory}</p>

      <div className="categorys">
        <Link to={`/${category}`}>
          <div className="category">All-{category}</div>
        </Link>
        <Link to={`/${category}`}>
          <div className="category" id="cat-active">
            {currentCategory}
          </div>
        </Link>
        
        {//renderSubCategories()
        }
      </div>

      <div className="sort-tab">
        <button className="sort-text" onClick={handleSortClick}>
          SORT <img src="/assets/sort.png" alt="Sort Icon" />
        </button>
        {showSortOptions && (
          <div className="sort-options">
            <div className="option" onClick={() => handleSortChange("low")}>
              Low to High
            </div>
            <div className="option" onClick={() => handleSortChange("high")}>
              High to Low
            </div>
            <div className="option" onClick={() => handleSortChange("new")}>
              New Arrival
            </div>
          </div>
        )}
      </div>

      <div className="products-sec" ref={productsContainerRef}>
        <div className="products">
          {loadingProducts ? (
            <div className="loading-prod">
              <div className="seleton"></div>
              <div className="seleton"></div>
              <div className="seleton"></div>
              <div className="seleton"></div>
            </div>
          ) : Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <Link to={`../product/${product.unique_title}`}>

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
          {loading && <p></p>}
        </div>
      </div>
    </>
  );
}
