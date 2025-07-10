import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
const clientBuildPath = path.join(process.cwd(), 'client', 'dist')
const staticPath = path.join(process.cwd(), 'server', 'src', 'static')

import { RedisStore } from 'connect-redis'
import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import fs from 'fs'
import passport from 'passport'
import { createClient } from 'redis'
import config from './config.json' with { type: 'json' }
import './mailer.js'
import * as middlewares from './middlewares.js'
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
app.use(express.static(staticPath))
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
      secure: true, // false
      sameSite: 'lax', // for stripe redirects
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

app.use('/api/products', routers.productsRouter)
app.use('/api/orders', middlewares.isAuthenticated, routers.ordersRouter)
app.use('/api/saves', middlewares.isAuthenticated, routers.savesRouter)

app.use('/api/local', middlewares.isNotAuthenticated, routers.localRouter)
app.use('/api/google', routers.googleRouter)
app.use('/api/github', routers.githubRouter)
app.use('/api/auth', routers.userRouter)

app.get('/api/static/:id', (req, res) => {
  const filePath = path.join(staticPath, req.params.id)

  if (!fs.existsSync(filePath)) {
    res.sendFile(path.join(staticPath, '404.jpg'))
    return
  }

  res.sendFile(filePath)
})

app.get('/*', (_req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'))
})

const port = Number(process.env.PORT) ?? config.SERVER_PORT
app.listen(port, () =>
  console.log(`Server listening on port ${port}\nhttp://localhost:${port}`)
)
