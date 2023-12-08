import React from 'react'
import './about.css'
import Footer from './Footer'

export default function About() {
  return (
    <footer className="kilimanjaro_area">
      {/* Top Footer Area Start */}
      <div className="foo_top_header_one section_padding_100_70">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="kilimanjaro_part">
                <h5>About Us</h5>
                <p>
                  It includes rich features & contents. It's designed & developed based on One Page/ Multi-page
                  Layout, blog themes, world press themes, and blogspot. You can use any layout from any demo anywhere.
                </p>
                <p>Our company is completely creative, clean & 100% responsive website. Put your business into the next level with us.</p>
              </div>
              <div className="kilimanjaro_part m-top-15">
                <h5>Social Links</h5>
                <ul className="kilimanjaro_social_links">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" aria-hidden="true"></i> Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true"></i> Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-pinterest" aria-hidden="true"></i> Pinterest
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-youtube" aria-hidden="true"></i> YouTube
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" aria-hidden="true"></i> Linkedin
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="kilimanjaro_part m-top-15">
                <h5>Important Links</h5>
                <ul className="kilimanjaro_links">
                  <li>
                    <a href="#">
                      <i className="fa fa-angle-right" aria-hidden="true"></i>Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-angle-right" aria-hidden="true"></i>About Licences
                    </a>
                  </li>
                  {/* Repeat the above li for other important links */}
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="kilimanjaro_part">
                <h5>Quick Contact</h5>
                <div className="kilimanjaro_single_contact_info">
                  <h5>Phone:</h5>
                  <p>+255 255 54 53 52 <br /> +255 255 53 52 51</p>
                </div>
                <div className="kilimanjaro_single_contact_info">
                  <h5>Email:</h5>
                  <p>
                    support@email.com <br />
                    company@email.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </footer>
  )
}
