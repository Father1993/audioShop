import { useState } from 'react'
import AuthPopupRegistration from './AuthPopupRegistration'

const AuthPopup = () => {
  const [isAuthSwitched, setIsAuthSwitched] = useState(false)
  const [isSignInActive, setIsSignInActive] = useState(false)
  const [isSignUpActive, setIsSignUpActive] = useState(true)

  const toggleAuth = () => {
    setIsAuthSwitched(!isAuthSwitched)
    setIsSignInActive(!isSignInActive)
    setIsSignUpActive(!isSignUpActive)
  }

  return (
    <div className='container auth-popup'>
      <div>
        <div className='starsec' />
        <div className='starthird' />
        <div className='starfourth' />
        <div className='starfifth' />
      </div>
      <div className={`auth-popup__card ${isAuthSwitched ? 'switched' : ''}`}>
        <div className='auth-popup__card__inner'>
          <AuthPopupRegistration
            toggleAuth={toggleAuth}
            isSideActive={isSignupActive}
          />
          <AuthPopupLogin
            toggleAuth={toggleAuth}
            isSideActive={isSignInActive}
          />
        </div>
      </div>
    </div>
  )
}

export default AuthPopup
