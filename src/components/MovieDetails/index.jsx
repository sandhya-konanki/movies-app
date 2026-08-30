import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router'
import Cookies from 'js-cookie'
import ClipLoader from 'react-spinners/ClipLoader'

import endpoints from '../endpoints'

import './index.css'

const MovieDetails = () => {
  const {id} = useParams()

  const [movieDetails, setMovieDetails] = useState(null)
  const [apiStatus, setApiStatus] = useState('INITIAL')

  const getMovieDetails = async () => {
    setApiStatus('IN_PROGRESS')

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(
        `${endpoints.getMovieItemDetailsApi}/${id}`,
        options,
      )

      if (response.ok) {
        const data = await response.json()

        setMovieDetails(data.movie_details)
        setApiStatus('SUCCESS')
      } else {
        setApiStatus('FAILURE')
      }
    } catch (error) {
      setApiStatus('FAILURE')
    }
  }

  useEffect(() => {
    getMovieDetails()
  }, [id])

  const renderLoading = () => (
    <div data-testid="loader">
      <ClipLoader size={50} />
    </div>
  )

  const renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />

      <p>Something went wrong. Please try again</p>

      <button type="button" onClick={getMovieDetails}>
        Try Again
      </button>
    </div>
  )

  const convertRuntime = runtime => {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60

    return `${hours}h ${minutes}m`
  }

  const getYear = date => date.split('-')[0]

  const renderSuccess = () => {
    const {
      adult,
      backdrop_path,
      genres,
      overview,
      poster_path,
      release_date,
      runtime,
      spoken_languages,
      title,
      vote_average,
      vote_count,
      budget,
      similar_movies,
    } = movieDetails

    return (
      <main>
        <Link to="/">Home</Link>

        <img src={backdrop_path} alt={title} />

        <h1>{title}</h1>

        <button type="button">Play</button>

        <p>{convertRuntime(runtime)}</p>

        <p>{adult ? 'A' : 'U/A'}</p>

        <p>{getYear(release_date)}</p>

        <p>{overview}</p>

        <h1>Genres</h1>

        <ul>
          {genres.map(eachGenre => (
            <li key={eachGenre.id}>
              <p>{eachGenre.name}</p>
            </li>
          ))}
        </ul>

        <h1>Audio Available</h1>

        <ul>
          {spoken_languages.map(eachLanguage => (
            <li key={eachLanguage.english_name}>
              <p>{eachLanguage.english_name}</p>
            </li>
          ))}
        </ul>

        <h1>Rating Count</h1>
        <p>{vote_count}</p>

        <h1>Rating Average</h1>
        <p>{vote_average}</p>

        <h1>Budget</h1>
        <p>{budget}</p>

        <h1>Release Date</h1>
        <p>{release_date}</p>

        <h1>More like this</h1>

        <ul>
          {similar_movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img src={movie.poster_path} alt={movie.title} />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    )
  }

  if (apiStatus === 'IN_PROGRESS') {
    return renderLoading()
  }

  if (apiStatus === 'FAILURE') {
    return renderFailure()
  }

  if (apiStatus === 'SUCCESS') {
    return renderSuccess()
  }

  return null
}

export default MovieDetails
