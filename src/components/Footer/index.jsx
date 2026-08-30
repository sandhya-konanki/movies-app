import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <p className="contact-us">Contact us</p>

    <div className="social-icons-container">
      <button type="button" className="social-button">
        <FaGoogle />
      </button>

      <button type="button" className="social-button">
        <FaTwitter />
      </button>

      <button type="button" className="social-button">
        <FaInstagram />
      </button>

      <button type="button" className="social-button">
        <FaYoutube />
      </button>
    </div>
  </footer>
)

export default Footer
