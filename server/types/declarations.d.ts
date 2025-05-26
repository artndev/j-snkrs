export {}
import 'express-session'

declare module 'express-session' {
  interface SessionData {
    passport: {
      user: IUser | undefined
    }
  }
}

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
