import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
const clientBuildPath = path.join(process.cwd(), '../', 'client', 'dist')

import { RedisStore } from 'connect-redis'
import cookieParser from 'cookie-parser'
import express, { NextFunction, Request, Response } from 'express'
import session from 'express-session'
import passport from 'passport'
import { createClient } from 'redis'
import config from './config.json' with { type: 'json' }
import { userController } from './controllers/_controllers.js'
import * as routers from './routers/_routers.js'
import './strategies/_strategies.js'

let redisClient = createClient({ url: process.env.REDIS_URL })
redisClient.connect().catch(console.error)

let redisStore = new RedisStore({ client: redisClient })

const app = express()
// app.use(
//   cors({
//     origin: config.CLIENT_URL,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// )
app.use(express.json())
app.use(express.static(clientBuildPath))
app.use(cookieParser(process.env.SESSION_SECRET!))
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    saveUninitialized: false,
    resave: false,
    proxy: true,
    store: redisStore,
    cookie: {
      maxAge: 3600000, // 1h
      path: '/',
      httpOnly: true,
      secure: false, // true
      sameSite: 'strict',
    },
  })
)
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user: Express.User, done) => {
  return done(null, user)
})

passport.deserializeUser((user: Express.User, done) => {
  return done(null, user)
})

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      message: 'You have not authorized yet',
      answer: null,
    })
    return
  }

  next()
}

const isNotAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    res.status(401).json({
      message: 'You have already authorized',
      answer: null,
    })
    return
  }

  next()
}

app.use('/api/local', isNotAuthenticated, routers.localRouter)
app.use('/api/google', routers.googleRouter)
app.use('/api/github', routers.githubRouter)

app.get('/api/auth/status', isAuthenticated, (req, res) => {
  res.status(200).json({
    message: 'You are authorized',
    answer: req.user,
  })
})

app.post('/api/auth/logout', isAuthenticated, (req, res) => {
  req.logout(err => {
    if (err) {
      res.status(500).json({
        message: 'Server is not responding',
        answer: null,
      })
      return
    }

    res.status(200).json({
      message: 'You have successfully logged out',
      answer: true,
    })
  })
})

app.get('/*', (_req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'))
})

const port = config.SERVER_PORT
app.listen(port, () => console.log(`Server listening on port ${port}`))
