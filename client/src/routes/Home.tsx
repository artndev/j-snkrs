import React, { useEffect } from 'react'
import axios from '../axios'
import { Button } from '../components/ui/button'
import config from '../config.json'
import { useAuthContext } from '../contexts/Auth'
import '../styles/css/Home.css'

const Home = () => {
  const { auth, setAuth } = useAuthContext()

  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault()

      axios
        .post('/api/auth/logout')
        .then(() => setAuth(undefined))
        .catch(err => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }

  // useEffect(() => {
  //   console.log(auth)
  // }, [auth])

  return (
    <>
      <Button size={'sm'} style={{ minWidth: 200 }}>
        Test
      </Button>
      <div className="home__container">
        <div className="home__subcontainer">
          {!auth ? (
            <h3>Not Authorized</h3>
          ) : (
            <>
              <h3>Authorized</h3>
              <div className="home__group">
                {!auth.GoogleId ? (
                  <a
                    href={`${config.SERVER_URL}/api/google/login?id=${auth.Id}`}
                  >
                    Attach Google
                  </a>
                ) : (
                  <span>
                    Google is attached as: <strong>{auth.GoogleId}</strong>
                  </span>
                )}
                {!auth.GithubId ? (
                  <a
                    href={`${config.SERVER_URL}/api/github/login?id=${auth.Id}`}
                  >
                    Attach Github
                  </a>
                ) : (
                  <span>
                    Github is attached as: <strong>{auth.GithubId}</strong>
                  </span>
                )}
              </div>
              <button type="button" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
