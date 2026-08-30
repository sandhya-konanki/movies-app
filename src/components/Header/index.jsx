
import {Link, NavLink} from 'react-router'

import MoviesSearch from '../MoviesSearch'

import './index.css'

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <img
            src="https://res.cloudinary.com/dq4hzvfnr/image/upload/v1787745123/Group_7399_vx0lit.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>

        <nav>
          <ul className="nav-list">
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/popular" className="nav-link">
                Popular
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <MoviesSearch />

          <Link to="/account">
            <img
              src="https://res.cloudinary.com/dq4hzvfnr/image/upload/v1787745710/Avatar_ldpeio.png"
              alt="profile"
              className="profile-image"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header

