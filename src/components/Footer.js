import React from 'react'
import './footer.css';
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <div className="footer-basic">
      <footer>
        
        <ul className="list-inline">
        <Link to={'./about'}>
          <li className="list-inline-item">Home</li>
          </Link>
        </ul>
        <p className="copyright">AptMen © </p>
      </footer>
    </div>
  )
}
