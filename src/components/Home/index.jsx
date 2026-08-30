import {useEffect, useState} from 'react'
import {Link} from 'react-router'
import Cookies from 'js-cookie'
import BeatLoader from 'react-spinners/BeatLoader'

import ReactSlick from '../ReactSlick'
import endpoints from '../endpoints'

import './index.css'

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [originalMovies, setOriginalMovies] = useState([])

  const [trendingStatus, setTrendingStatus] = useState('INITIAL')
  const [originalStatus, setOriginalStatus] = useState('INITIAL')

  const [randomMovie, setRandomMovie] = useState(null)

  const getTrendingMovies = async () => {
    setTrendingStatus('IN_PROGRESS')

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(endpoints.trendingMoviesApi, options)

      if (response.ok) {
        const data = await response.json()

        const movies = Array.isArray(data.results) ? data.results : []

        setTrendingMovies(movies)
        setTrendingStatus('SUCCESS')
      } else {
        setTrendingMovies([])
        setTrendingStatus('FAILURE')
      }
    } catch (error) {
      setTrendingMovies([])
      setTrendingStatus('FAILURE')
    }
  }

  const getOriginalMovies = async () => {
    setOriginalStatus('IN_PROGRESS')

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(endpoints.originalsApi, options)

      if (response.ok) {
        const data = await response.json()

        const movies = Array.isArray(data.results) ? data.results : []

        setOriginalMovies(movies)

        if (movies.length > 0) {
          const randomIndex = Math.floor(Math.random() * movies.length)
          setRandomMovie(movies[randomIndex])
        } else {
          setRandomMovie(null)
        }

        setOriginalStatus('SUCCESS')
      } else {
        setOriginalMovies([])
        setRandomMovie(null)
        setOriginalStatus('FAILURE')
      }
    } catch (error) {
      setOriginalMovies([])
      setRandomMovie(null)
      setOriginalStatus('FAILURE')
    }
  }

  useEffect(() => {
    getTrendingMovies()
    getOriginalMovies()
  }, [])

  const renderBanner = () => {
    if (originalStatus === 'IN_PROGRESS') {
      return (
        <div className="loader-container" data-testid="loader">
          <BeatLoader size={15} />
        </div>
      )
    }

    if (originalStatus === 'FAILURE') {
      return (
        <div className="failure-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <p>Something went wrong. Please try again</p>
          <button type="button" onClick={getOriginalMovies}>
            Try Again
          </button>
        </div>
      )
    }

    if (randomMovie === null) {
      return null
    }

    return (
      <section className="banner">
        <img src={randomMovie.backdrop_path} alt={randomMovie.title} />

        <div className="banner-content">
          <h1>{randomMovie.title}</h1>

          <p>{randomMovie.overview}</p>

          <Link to={`/movies/${randomMovie.id}`}>
            <button type="button">Play</button>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <main className="home-container">
      {renderBanner()}

      <section>
        <h1>Trending Now</h1>

        <ReactSlick
          apiStatus={trendingStatus}
          moviesList={trendingMovies}
          retryFn={getTrendingMovies}
        />
      </section>

      <section>
        <h1>Originals</h1>

        <ReactSlick
          apiStatus={originalStatus}
          moviesList={originalMovies}
          retryFn={getOriginalMovies}
        />
      </section>
    </main>
  )
}

export default Home
