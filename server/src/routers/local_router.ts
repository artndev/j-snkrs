import express from 'express'
import passport from 'passport'
import config from '../config.json' with { type: 'json' }
import { magicLogin } from '../strategies/magic_strategy.js'

const router = express.Router()

router.post(
  '/login',
  passport.authenticate('local-login', {
    failureRedirect: `${config.CLIENT_URL}/fallback`,
    successReturnToOrRedirect: `${config.CLIENT_URL}`,
  })
)

router.post('/register', magicLogin.send)

router.get(
  '/register/callback',
  passport.authenticate('magic-login', {
    failureRedirect: `${config.CLIENT_URL}/fallback`,
    successReturnToOrRedirect: `${config.CLIENT_URL}`,
  })
)

export default router
