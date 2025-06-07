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

declare global {
  namespace Express {
    interface User extends IUser {}

    interface Request {
      otp?: string
    }
  }
}
