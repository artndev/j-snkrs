// @ts-nocheck
import dotenv from 'dotenv'
dotenv.config()

import passport from 'passport'
import MagicLoginStrategy from 'passport-magic-login'
import config from '../config.json' with { type: 'json' }
import { usersController } from '../controllers/_controllers.js'
import mailer from '../mailer.js'
import config from '../config.json' with { type: 'json' }

export const magicLogin = new MagicLoginStrategy.default({
  secret: process.env.MAGIC_LINK_SECRET!,
  callbackUrl: `${config.SERVER_URL}/api/local/register/callback`,
  sendMagicLink: async (destination, href) => {
    const user = JSON.parse(destination) as ICredentials

    // ${config.SERVER_URL}/api/static/cat.jpg
    await mailer.sendMail(
      [user.email],
      'Verification Link',
      `<div style="width: 200px; height: 200px; border-radius: calc(.625rem + 4px); overflow: hidden;"> <img src="${config.SERVER_URL}/api/static/cat.jpg" style="width: 100%; object-fit: cover;" /> </div> <br /> <a href="${href}"> Tap here to verify your email </a>`
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
