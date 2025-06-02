// @ts-nocheck
import dotenv from 'dotenv'
dotenv.config()

import passport from 'passport'
import MagicLoginStrategy from 'passport-magic-login'
import config from '../config.json' with { type: 'json' }
import { usersController } from '../controllers/_controllers.js'
import mailer from '../mailer.js'

export const magicLogin = new MagicLoginStrategy.default({
  secret: process.env.MAGIC_LINK_SECRET!,
  callbackUrl: `${config.SERVER_URL}/api/local/register/callback`,
  sendMagicLink: async (destination, href) => {
    const user = JSON.parse(destination) as ICredentials

    await mailer.sendMail(
      [user.email],
      'Confirm Your Email',
      `<a href="${href}"> Tap here </a>`
    )
  },
  verify: async (payload, done, req) => {
    const user = JSON.parse(payload.destination) as ICredentials

    return await usersController
      .Register(user, true)
      .then(res => done(null, res.answer))
      .catch(err => {
        console.log(err)

        return done(err, undefined)
      })
  },
  jwtOptions: {
    expiresIn: '5m',
  },
})

export default [passport.use('magic-login', magicLogin)]
