export {}
import 'express-session'
import 'passport-magic-link'
import 'express'

declare module 'express-session' {
  interface SessionData {
    passport: {
      user: IUser | undefined
    }
  }
}

declare module 'passport-magic-link' {}

interface User {}

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
