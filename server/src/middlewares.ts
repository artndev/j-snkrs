import { NextFunction, Request, Response } from 'express'

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      message: 'You have not authorized yet',
      answer: null,
    })
    return
  }

  next()
}

export const isNotAuthenticated = (
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
