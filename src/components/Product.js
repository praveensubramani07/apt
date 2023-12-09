import React, { useState, useEffect } from 'react';
import './product.css';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';

export default function Product() {
  const { title } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pranavresidency.com/aptdashboard/aptdashboard/api/get_product.php?title=${title}`);
        const data = await response.json();
        setProductData(data.data[0]); // Assuming the API response is in the correct format
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [title]);

  if (loading) {
    // Loading state, you can customize this part
    return (
      <>
        <NavBar />
        <div className='loading-product'>
          <div className='skel'></div>
          <div className='skel'></div>
        </div>
      </>
    );
  }
  

  if (!productData) {
    // Failed to fetch data
    return <p>Error fetching product data</p>;
  }

  // Once data is fetched, render the product details
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="img-pc">
          <div className="pc-1">
            <img className="img-1" src={`https://pranavresidency.com/aptdashboard/aptdashboard/uploads/${productData.image1}`} alt={productData.title} />
          </div>
          <div className="pc-2">
            <img className="img-2" src={`https://pranavresidency.com/aptdashboard/aptdashboard/uploads/${productData.image2}`} alt={productData.title} />
            <img className="img-3" src={`https://pranavresidency.com/aptdashboard/aptdashboard/uploads/${productData.image3}`} alt={productData.title} />
          </div>
          <div className="pc-3">
            <img className="img-4" src={`https://pranavresidency.com/aptdashboard/aptdashboard/uploads/${productData.image4}`} alt={productData.title} />
          </div>
        </div>
        <div className="mob-img">
          <img className="img-1" src={`https://pranavresidency.com/aptdashboard/aptdashboard/uploads/${productData.image1}`} alt={productData.title} />
        </div>
        <div className="details">
          <p className="title">{productData.title}</p>
          <p className="tax">MRP All Chargers included</p>
          <p className="price">${productData.price}</p>
          <button className="buy-btn">Buy Now</button>
          <p className="size-text">Sizes</p>
          <div className="sizes">
            {productData.sizes.split(',').map((size, index) => (
              <button key={index} className="size">{size}</button>
            ))}
          </div>
          <p className="size-text">Product Details</p>
          <div className="pro-details">
            <ul>
              {productData.description.split(',').map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
          <p className="size-text">Materials</p>
          <div className="materials">
            <p>{productData.materials}</p>
          </div>
        </div>
        <div className="img-mob">
          <div className="mob-2">
            <img className="img-2" src={`https://pranavresidency.com/aptdashboard/aptdashboard/uploads/${productData.image2}`} alt={productData.title} />
            <img className="img-3" src={`https://pranavresidency.com/aptdashboard/aptdashboard/uploads/${productData.image3}`} alt={productData.title} />
          </div>
          <div className="mob-3">
            <img className="img-4" src={`https://pranavresidency.com/aptdashboard/aptdashboard/uploads/${productData.image4}`} alt={productData.title} />
          </div>
        </div>
      </div>
    </>
  );
}
