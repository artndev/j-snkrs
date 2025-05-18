import dotenv from 'dotenv'
dotenv.config()

import { Request } from 'express'
import passport from 'passport'
import { Strategy as GithubStrategy, Profile } from 'passport-github2'
import { VerifyCallback } from 'passport-google-oauth20'
import config from '../config.json' with { type: 'json' }
import { usersController } from '../controllers/_controllers.js'

export default [
  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: `${config.SERVER_URL}/api/github/callback`,
        passReqToCallback: true,
      },
      async (
        req: Request,
        _accessToken: string,
        _refreshToken: string | undefined,
        profile: Profile,
        done: VerifyCallback
      ) => {
        return await usersController
          .AttachGithubId({
            id: req.query?.state as string | undefined,
            githubId: profile.id,
          })
          .then(res => done(null, res.answer))
          .catch(err => {
            console.log(err)

            return done(err, undefined)
          })
      }
    )
  ),
]
