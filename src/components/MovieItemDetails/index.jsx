import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router'
import Cookies from 'js-cookie'
import {ClipLoader} from 'react-spinners'

import endpoints from '../endpoints'
import SimilarMovieDetails from '../SimilarMovieDetails'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const MovieItemDetails = () => {
  const {id} = useParams()

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [movieDetails, setMovieDetails] = useState(null)

  const getMovieDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `${endpoints.getMovieItemDetailsApi}/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(apiUrl, options)

      if (response.ok) {
        const data = await response.json()

        setMovieDetails(data.movie_details)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getMovieDetails()
  }, [id])

  const convertRuntime = runtime => {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60

    return `${hours}h ${minutes}m`
  }

  const getYear = releaseDate => {
    if (!releaseDate) {
      return ''
    }

    return releaseDate.split('-')[0]
  }

  const formatReleaseDate = releaseDate => {
    if (!releaseDate) {
      return ''
    }

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const parts = releaseDate.split('-')
    if (parts.length !== 3) {
      return releaseDate
    }

    const year = parts[0]
    const monthIndex = parseInt(parts[1], 10) - 1
    const day = parseInt(parts[2], 10)

    const getOrdinal = n => {
      if (n > 3 && n < 21) return 'th'
      switch (n % 10) {
        case 1:
          return 'st'
        case 2:
          return 'nd'
        case 3:
          return 'rd'
        default:
          return 'th'
      }
    }

    return `${day}${getOrdinal(day)} ${monthNames[monthIndex]} ${year}`
  }
  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <ClipLoader size={50} />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view-container">
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

  const renderMovieDetails = () => {
    const {
      adult,
      backdrop_path,
      budget,
      genres = [],
      overview,
      poster_path,
      release_date,
      runtime,
      spoken_languages = [],
      title,
      vote_average,
      vote_count,
      similar_movies = [],
    } = movieDetails

    return (
      <main className="movie-details-container">
        <Link to="/" className="home-link">
          Home
        </Link>

        <div className="movie-details-content">
          <img src={backdrop_path} alt={title} className="movie-backdrop" />

          <div className="movie-information">
            <h1>{title}</h1>

            <button type="button">Play</button>

            <p>{convertRuntime(runtime)}</p>

            <p>{adult ? 'A' : 'U/A'}</p>

            <p>{getYear(release_date)}</p>

            <p>{overview}</p>

            <div>
              <h1>genres</h1>

              <ul>
                {genres.map(eachGenre => (
                  <li key={eachGenre.id}>
                    <p>{eachGenre.name}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h1>Audio Available</h1>

              <ul>
                {spoken_languages.map(eachLanguage => (
                  <li key={eachLanguage.english_name}>
                    <p>{eachLanguage.english_name}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h1>Rating Count</h1>
              <p>{vote_count}</p>
            </div>

            <div>
              <h1>Rating Average</h1>
              <p>{vote_average}</p>
            </div>

            <div>
              <h1>Budget</h1>
              <p>{budget}</p>
            </div>

            <div>
              <h1>Release Date</h1>
              <p>{formatReleaseDate(release_date)}</p>
            </div>
          </div>
        </div>

        <div>
          <h1>More like this</h1>

          <ul>
            {similar_movies.map(eachMovie => (
              <SimilarMovieDetails key={eachMovie.id} movie={eachMovie} />
            ))}
          </ul>
        </div>
      </main>
    )
  }

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()

      case apiStatusConstants.success:
        return renderMovieDetails()

      case apiStatusConstants.failure:
        return renderFailureView()

      default:
        return null
    }
  }

  return renderView()
}

export default MovieItemDetails
