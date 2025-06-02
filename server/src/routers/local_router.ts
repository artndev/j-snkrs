import express from 'express'
import passport from 'passport'
import config from '../config.json' with { type: 'json' }
import { magicLogin } from '../strategies/magic_strategy.js'
import { usersController } from '../controllers/_controllers'

const router = express.Router()

router.post(
  '/login',
  passport.authenticate('local-login', {
    failureRedirect: `${config.CLIENT_URL}/fallback`,
    successReturnToOrRedirect: `${config.CLIENT_URL}`,
  })
)

router.post('/register', usersController.IsNotRegistered, magicLogin.send)

router.get('/register/callback', (req, res, next) => {
  return passport.authenticate(
    'magic-login',
    {
      failureRedirect: `${config.CLIENT_URL}/fallback`,
    },
    (
      err: Error | null | unknown,
      user: Express.User | false,
      _info: object
    ) => {
      if (err) return res.redirect(`${config.CLIENT_URL}/register`)
      if (!user) return res.redirect(`${config.CLIENT_URL}/fallback`)

      req.logIn(user, err2 => {
        if (err2) return res.redirect(`${config.CLIENT_URL}/fallback`)

        return res.redirect(`${config.CLIENT_URL}/account`)
      })
    }
  )(req, res, next)
})

export default router
