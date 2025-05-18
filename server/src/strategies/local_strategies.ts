import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { usersController } from '../controllers/_controllers.js'

export default [
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        return await usersController
          .Login({
            username: username,
            password: password,
          })
          .then(res => done(null, res.answer))
          .catch(err => {
            console.log(err)

            return done(err, undefined)
          })
      }
    )
  ),
  passport.use(
    'local-register',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        return await usersController
          .Register({
            username: username,
            password: password,
            email: req.body.email,
          })
          .then(res => {
            return done(null, res.answer)
          })
          .catch(err => {
            console.log(err)

            return done(err, undefined)
          })
      }
    )
  ),
]
