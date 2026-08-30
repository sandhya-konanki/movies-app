// @ts-nocheck
import {useNavigate} from 'react-router'
import ClipLoader from 'react-spinners/ClipLoader'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const ReactSlick = ({apiStatus, moviesList = [], retryFn}) => {
  const navigate = useNavigate()

  if (apiStatus === 'IN_PROGRESS') {
    return (
      <div className="loader-container" data-testid="loader">
        <ClipLoader size={50} />
      </div>
    )
  }

  if (apiStatus === 'FAILURE') {
    return (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button type="button" onClick={retryFn}>
          Try Again
        </button>
      </div>
    )
  }

  if (apiStatus !== 'SUCCESS') {
    return null
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {moviesList.map(eachMovie => (
          <div key={eachMovie.id}>
            <div
              onClick={() => navigate(`/movies/${eachMovie.id}`)}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  navigate(`/movies/${eachMovie.id}`)
                }
              }}
              role="button"
              tabIndex="0"
              style={{cursor: 'pointer'}}
            >
              <img
                src={eachMovie.poster_path}
                alt={eachMovie.title}
                className="movie-poster"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ReactSlick
