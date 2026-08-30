import {Link} from 'react-router'

const SimilarMovieDetails = ({movie}) => (
  <li>
    <Link to={`/movies/${movie.id}`}>
      <img src={movie.poster_path} alt={movie.title} />
    </Link>
  </li>
)

export default SimilarMovieDetails
