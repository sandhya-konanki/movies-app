import {Link} from 'react-router'

import './index.css'

const NotFound = () => (
  <main className="not-found-container">
    <img
      src="https://res.cloudinary.com/dq4hzvfnr/image/upload/v1787751425/93955cfc4c28572ced55c420bbcd234b14c68813_vmuuwg.jpg"
      alt="not found"
    />

    <h1>Lost Your Way</h1>

    <p>
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>

    <Link to="/">
      <button type="button">Go to Home</button>
    </Link>
  </main>
)

export default NotFound
