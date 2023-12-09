import Login from './Login';
import NavBar from './NavBar';
import './home.css';
import './style.css';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Home() {

    const [searchAct, setSearchAct] = useState(false);
const [keyword, setKeyword] = useState("");
const [menuAct, setMenuAct] = useState(false);

    const [loadingSubcategories, setLoadingSubcategories] = useState(true);
    const [subCategories, setSubCategories] = useState([]);
    const navigate = useNavigate();
  
    function handleSearchClick() {
      setSearchAct((prevSearchAct) => !prevSearchAct);
    }
  
    const handleKeyword = (event) => {
      setKeyword(event.target.value);
    };
  
    function handleMenu() {
      setMenuAct((prevMenuAct) => !prevMenuAct);
    }
  
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
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // Fetch subcategories and products
      fetchData();
    }, []);
  
    const fetchDataForCategory = (categoryName) => {
      // Implement your logic to fetch data for the specified category
      // For example: make an API call, update state, etc.
      console.log(`Fetching data for category: ${categoryName}`);
    };
  
    const renderSubCategories = () => {
      if (loadingSubcategories) {
        return (
          <div className="loading-sub">
            {/* ... (loading skeleton or spinner) */}
            <div className="sub-seleton"></div>
            <br></br>
            <div className="sub-seleton"></div>
          </div>
        );
      }
  
      if (Array.isArray(subCategories) && subCategories.length > 0) {
        return subCategories.map((subCategory) => (
          <div
            key={subCategory.id}
            className="cat-items"
            onClick={() => handleSubCategoryClick(subCategory.name.trim())}
          >
            <img src={`https://pranavresidency.com/aptdashboard/aptdashboard/uploads/${subCategory.image}`} />
            <p className='cat-name'>{subCategory.name}</p>
          </div>
        ));
      } else {
        return <p>No categories available.</p>;
      }
    };
  
    const handleSubCategoryClick = (categoryName) => {
      // Navigate to the new category route
      navigate(`/${categoryName}`);
  
      // Fetch data for the new category
      fetchDataForCategory(categoryName);
    };

  return (
    <>
    <NavBar/>
    <div className="main-ban">
        <div className="ban-1">
            <img src="/assets/product.jpg" alt="banner-1" />
        </div>
        <div className="ban-2">
            <img src="/assets/product.jpg" alt="banner-2" />
        </div>
    </div>
    <p className="cat">Fashion Categories</p>
    <div className="categoryss">
        {renderSubCategories()}
        {/* Repeat the above div for other categories */}
    </div>
    <p className="trending">Trending Now</p>
    <div className="products-sec">
        <div className="products">
            <div className="product">
                <img src="./assets/product.jpg" alt="product-1" />
                <p className="title">Mens Trendy Shirt</p>
                <p className="price">$799</p>
            </div>
            {/* Repeat the above div for other products */}
        </div>
    </div>
    <Footer/>
</>
    

  )
}
