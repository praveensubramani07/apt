import React from 'react'
import './footer.css';
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <div className="footer-basic">
      <footer>
        <div className="social">
          <i className="icon ion-social-instagram"></i>
          <i className="icon ion-social-snapchat"></i>
          <i className="icon ion-social-twitter"></i>
         <i className="icon ion-social-facebook"></i>
        </div>
        <ul className="list-inline">
        <Link to={'./about'}>
          <li className="list-inline-item">Home</li>
          </Link>
        </ul>
        <p className="copyright">Company Name © 2018</p>
      </footer>
    </div>
  )
}
