// @ts-nocheck
import dotenv from 'dotenv'
dotenv.config()

import nodemailer from 'nodemailer'
import DirectTransport from 'nodemailer-direct-transport'
import passport from 'passport'
import MagicLoginStrategy from 'passport-magic-login'
import config from '../config.json' with { type: 'json' }
import { usersController } from '../controllers/_controllers.js'
// ;(async () => {
//   try {
//     const transporter = nodemailer.createTransport(
//       DirectTransport({
//         name: 'artnworkkkkk@mail.my',
//       })
//     )

//     console.log('Processing...')
//     await transporter
//       .sendMail({
//         from: '\"Maddison Foo Koch\" <artnworkkkkk@mail.my>',
//         to: 'agressorios@gmail.com',
//         subject: 'Confirmation Email',
//         html: `<a href="https://google.com">Confirm your email</a>`,
//       })
//       .catch(err => {
//         console.log(err)
//       })
//     console.log('email was sent')
//   } catch (err) {
//     console.log(err)
//   }
// })()

export default [
  passport.use(
    'magic-login',
    new MagicLoginStrategy.default({
      secret: process.env.MAGIC_LINK_SECRET!,
      callbackUrl: `${config.SERVER_URL}/api/magic/callback`,
      sendMagicLink: async (destination, href) => {
        const user = JSON.parse(destination) as IUser

        await transporter.sendMail({
          from: '\"Maddison Foo Koch\" <maddison531531@ethereal.email>',
          to: user.Email,
          subject: 'Confirmation Email',
          html: `<a href="${config.SERVER_URL + href}">Confirm your email</a>`,
        })
      },
      verify: (payload, done, req) => {
        const user = JSON.parse(payload.destination) as IUser

        return usersController
          .VerifyEmail(req, user.Id)
          .then(res => done(null, new Object(res.answer)))
          .catch(err => {
            console.log(err)

            return done(err, undefined)
          })
      },
      jwtOptions: {
        expiresIn: '5m',
      },
    })
  ),
]
