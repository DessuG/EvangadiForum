import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../Pages/assets/images/10001.png'
import classes from '../Pages/CSS/header.module.css'
import { AppState } from '../App'

function Header() {
  const { isLoggedIn, handleLogout } = useContext(AppState)
  const navigate = useNavigate()

  const handleSignInOut = () => {
    if (isLoggedIn) {
      handleLogout()
    } else {
      navigate('/login')
    }
  }

  return (
    <section className={classes.header_wraper}>
      <div className={classes.header_content}>
        <div className={classes.logo_wraper}>
          <img src={logo} alt="" />
        </div>
        
        <div className={classes.home_text}>
          Home
          <button onClick={handleSignInOut}>
            {isLoggedIn ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Header
