import {useEffect, useState} from 'react'
import {useLocation, Link} from 'react-router'
import Cookies from 'js-cookie'
import BeatLoader from 'react-spinners/BeatLoader'

import endpoints from '../endpoints'

import './index.css'

const Search = () => {
  const location = useLocation()

  const [movies, setMovies] = useState([])
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchedValue, setSearchedValue] = useState('')

  const getSearchMovies = async searchValue => {
    if (!searchValue || searchValue.trim() === '') {
      return
    }

    setApiStatus('IN_PROGRESS')
    setSearchedValue(searchValue)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(
        `${endpoints.searchMoviesApi}?search=${searchValue}`,
        options,
      )

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
    const searchParams = new URLSearchParams(location.search)
    const searchValue = searchParams.get('search')

    getSearchMovies(searchValue)
  }, [location.search])

  const renderNoMovies = () => (
    <div className="no-results-container">
      <img
        src="https://res.cloudinary.com/dq4hzvfnr/image/upload/v1787750926/Group_7394_vvb26w.png"
        alt="no movies"
        className="no-results-image"
      />

      <p className="no-results-text">
        Your search for {searchedValue} did not find any matches.
      </p>
    </div>
  )

  const renderMovies = () => (
    <ul className="search-movies-list">
      {movies.map(eachMovie => (
        <li key={eachMovie.id} className="search-movie-item">
          <Link to={`/movies/${eachMovie.id}`}>
            <img
              src={eachMovie.poster_path}
              alt={eachMovie.title}
              className="search-movie-image"
            />
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <main className="search-container">
      {apiStatus === 'IN_PROGRESS' && (
        <div className="loader-container" data-testid="loader">
          <BeatLoader color="#D81F26" size={15} />
        </div>
      )}

      {apiStatus === 'FAILURE' && (
        <div className="failure-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />

          <p>Something went wrong. Please try again</p>

          <button
            type="button"
            onClick={() => getSearchMovies(searchedValue)}
          >
            Try Again
          </button>
        </div>
      )}

      {apiStatus === 'SUCCESS' &&
        movies.length === 0 &&
        renderNoMovies()}

      {apiStatus === 'SUCCESS' &&
        movies.length > 0 &&
        renderMovies()}
    </main>
  )
}

export default Search