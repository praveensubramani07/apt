import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

export default function NavBar() {
  const [searchAct, setSearchAct] = useState(false);
  const [menuAct, setMenuAct] = useState(false);
  const [keyword, setKeyword] = useState('');
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
          `http://aptdashboard.000webhostapp.com/api/get_categorys.php`
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
          className="menu-item"
          onClick={() => handleSubCategoryClick(subCategory.name.trim())}
        >
          <img src={`http://aptdashboard.000webhostapp.com/uploads${subCategory.image}`} />
          <p>{subCategory.name}</p>
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
      <div className="nav">
        {(searchAct === false) ? (
          <>
            <div className="ham" onClick={handleMenu}>
              <img src="/assets/menu.png" alt="Menu" />
            </div>
            <Link to={'../'}>
            <div className="logo"><h1>APT</h1></div>
            </Link>
            <div className="left">
              <div className="search" onClick={handleSearchClick}><img src="/assets/search.png" alt="Search" /></div>
              <div className="profile"><img src="/assets/user.png" alt="Profile" /></div>
            </div>
          </>
        ) : (
          <div className='search-active'>
            <div className="search" onClick={handleSearchClick}><img src="/assets/sort.png" alt="Sort" /></div>
            <input type='search' onChange={handleKeyword} />
            <Link to={`/search/${keyword}`}>
              <div className="search"><img src="/assets/search.png" alt="Search" /></div>
            </Link>
          </div>
        )}
      </div>

      {menuAct && (
        <div className='menu'>
          {renderSubCategories()}
          <ul>
            <li>Privacy Policy</li>
            <li>Return and payments</li>
            <li>About Us</li>
            <li>Find store</li>
          </ul>
        </div>
      )}
    </>
  );
}
