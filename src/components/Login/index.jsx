
import {useState} from 'react'
import {Navigate, useNavigate} from 'react-router'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import Cookies from 'js-cookie'

import endpoints from '../endpoints'

import './index.css'

const Login = () => {
  const navigate = useNavigate()

  const jwtToken = Cookies.get('jwt_token')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // If already logged in, go to Home
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  const onSubmitLogin = async event => {
    event.preventDefault()

    // Clear previous error
    setErrorMsg('')

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    try {
      console.log('Login API:', endpoints.loginApi)
      console.log('User details:', userDetails)

      const response = await fetch(endpoints.loginApi, options)

      console.log('Response status:', response.status)

      const data = await response.json()

      console.log('Response data:', data)

      if (response.ok) {
        console.log('Login successful')

        Cookies.set('jwt_token', data.jwt_token, {
          expires: 30,
        })

        localStorage.setItem('username', username)
        localStorage.setItem('password', password)

        navigate('/')
      } else {
        console.log('Login failed:', data.error_msg)

        setErrorMsg(data.error_msg || 'Invalid username or password')
      }
    } catch (error) {
      console.log('LOGIN ERROR:', error)

      setErrorMsg('Something went wrong. Please try again')
    }
  }

  return (
    <div className="login-container">
      <img
        src="https://res.cloudinary.com/dq4hzvfnr/image/upload/v1787745123/Group_7399_vx0lit.png"
        alt="login website logo"
        className="login-logo"
      />

      <h1>LOGIN</h1>

      <form className="login-form" onSubmit={onSubmitLogin}>
        <div className="input-container">
          <label htmlFor="username">USERNAME</label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className="input-container">
          <label htmlFor="password">PASSWORD</label>

          <div className="password-container">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="Enter password"
            />

            <button
              type="button"
              className="eye-button"
              onClick={() =>
                setShowPassword(previousState => !previousState)
              }
              aria-label={
                showPassword ? 'Hide password' : 'Show password'
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        {errorMsg !== '' && (
          <p className="error-message">{errorMsg}</p>
        )}
      </form>
    </div>
  )
}

export default Login

