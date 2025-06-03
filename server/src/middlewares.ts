import dotenv from 'dotenv'
dotenv.config()

import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ResultSetHeader } from 'mysql2'
import pool from './pool.js'

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

export const createCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.Id
    const token = req.query.token as string

    jwt.verify(token, process.env.JWT_SECRET!)

    const data = jwt.decode(token) as IJwtPayload

    const [rows] = await pool.query<IProduct[]>(
      'SELECT * FROM Checks WHERE ReferenceId = ? AND UserId = ?;',
      [data.referenceId, userId]
    )

    if (rows.length) {
      res.status(400).json({
        message: 'You have already created check with such id',
        answer: null,
      })
      return
    }

    await pool.query<ResultSetHeader>(
      'INSERT INTO Checks (ReferenceId, LineItems, TotalPrice, UserId) VALUES (?, ?, ?, ?);',
      [data.referenceId, data.lineItems, data.totalPrice, userId]
    )

    next()
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server is not responding',
      answer: err,
    })
  }
}

export const IsNotRegistered = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = JSON.parse(req.body.destination) as ICredentials

    const [rows] = await pool.query<IUser[]>(
      'SELECT * FROM Users WHERE Username = ? OR Email = ?;',
      [user.username, user.email]
    )

    if (rows.length) {
      res.status(400).json({
        message: 'Your authorization credentials are invalid',
        answer: null,
      })
      return
    }

    next()
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server is not responding',
      answer: null,
    })
  }
}
