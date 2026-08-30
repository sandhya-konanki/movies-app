
import {useState} from 'react'
import {useNavigate} from 'react-router'
import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

const MoviesSearch = () => {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const onChangeSearch = event => {
    setSearchValue(event.target.value)
  }

  const onSearch = () => {
    if (searchValue.trim() === '') {
      return
    }

    navigate(`/search?search=${searchValue}`)
  }

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className="movies-search-container">
      <input
        type="search"
        value={searchValue}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder="Search"
        className="search-input"
      />

      <button
        type="button"
        data-testid="searchButton"
        className="search-button"
        onClick={onSearch}
        aria-label="search"
      >
        <HiOutlineSearch size={25} />
      </button>
    </div>
  )
}

export default MoviesSearch

