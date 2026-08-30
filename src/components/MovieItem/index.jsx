// Write your code here
import {Link} from 'react-router'

import './index.css'

const MovieItem = ({movieDetails}) => {
  const {id, title, posterPath} = movieDetails

  return (
    <li className="movie-item">
      <Link to={`/movies/${id}`} className="movie-link">
        <img src={posterPath} alt={title} className="movie-poster" />
      </Link>
    </li>
  )
}

export default MovieItem
