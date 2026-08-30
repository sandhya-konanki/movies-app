import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import BeatLoader from 'react-spinners/BeatLoader'
import {Link} from 'react-router'

import endpoints from '../endpoints'

import './index.css'

const Popular = () => {
  const [movies, setMovies] = useState([])
  const [apiStatus, setApiStatus] = useState('INITIAL')

  const getPopularMovies = async () => {
    setApiStatus('IN_PROGRESS')

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(endpoints.popularMoviesApi, options)

      if (response.ok) {
        const data = await response.json()

        setMovies(data.results)
        setApiStatus('SUCCESS')
      } else {
        setApiStatus('FAILURE')
      }
    } catch (error) {
      setApiStatus('FAILURE')
    }
  }

  useEffect(() => {
    getPopularMovies()
  }, [])

  if (apiStatus === 'IN_PROGRESS') {
    return (
      <div data-testid="loader">
        <BeatLoader color="#D81F26" size={15} />
      </div>
    )
  }

  if (apiStatus === 'FAILURE') {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />

        <p>Something went wrong. Please try again</p>

        <button type="button" onClick={getPopularMovies}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <main>
      <h1>Popular</h1>

      <ul className="movies-list">
        {movies.map(eachMovie => (
          <li key={eachMovie.id}>
            <Link to={`/movies/${eachMovie.id}`}>
              <img src={eachMovie.poster_path} alt={eachMovie.title} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Popular
