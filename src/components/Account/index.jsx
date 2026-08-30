import {useNavigate} from 'react-router'
import Cookies from 'js-cookie'

import './index.css'

const Account = () => {
  const navigate = useNavigate()

  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  const maskedPassword = '*'.repeat(password ? password.length : 0)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    localStorage.removeItem('username')
    localStorage.removeItem('password')

    navigate('/login')
  }

  return (
    <main className="account-container">
      <h1>Account</h1>

      <div>
        <p>Member ship</p>
        <p>{username}</p>

        <p>Password</p>
        <p>{maskedPassword}</p>

        <p>Plan details </p>
        <p>Premium</p>
        <p>Ultra HD</p>
      </div>

      <button type="button" onClick={onClickLogout}>
        Logout
      </button>
    </main>
  )
}

export default Account
