import {Link} from 'react-router'

const SimilarMovies = ({movies}) => {
  return (
    <ul>
      {movies.map(eachMovie => (
        <li key={eachMovie.id}>
          <Link to={`/movies/${eachMovie.id}`}>
            <img src={eachMovie.poster_path} alt={eachMovie.title} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SimilarMovies
