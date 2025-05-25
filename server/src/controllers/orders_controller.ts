import dotenv from 'dotenv'
dotenv.config()

import { Request, Response, NextFunction } from 'express'
import { Stripe } from 'stripe'
import config from '../config.json' with { type: 'json' }
import type { ResultSetHeader } from 'mysql2'
import pool from '../pool.js'
import { v4 as uuidv4 } from 'uuid'

const stripe = new Stripe(process.env.STRIPE_SECRET!)
export default {
  createCheckoutSession: async (req: Request, res: Response) => {
    try {
      const lineItems = req.body.products.map((product: IProductCheckout) => ({
        price_data: {
          currency: product.currency,
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.price * 100), // bc dollars
        },
        quantity: product.quantity,
      }))

      const referenceId = uuidv4()
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${config.SERVER_URL}/api/orders/success?id=${referenceId}`,
        cancel_url: `${config.SERVER_URL}/api/orders/cancel`,
        client_reference_id: referenceId,
      })

      res.status(200).json({
        message: 'You have successfully created check',
        answer: {
          id: session.id,
        },
      })
    } catch (err) {
      console.error(err)

      res.status(500).json({
        message: 'Server is not responding',
        answer: err,
      })
    }
  },
  createCheck: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.Id
      const id = req.query.id

      const [rows] = await pool.query<IProduct[]>(
        'SELECT * FROM Checks WHERE Id = ? AND UserId = ?;',
        [id, userId]
      )

      if (rows.length) {
        res.status(400).json({
          message: 'You have already created check with such id',
          answer: null,
        })
        return
      }

      await pool.query<ResultSetHeader>(
        'INSERT INTO Checks (Id, UserId) VALUES (?, ?);',
        [id, userId]
      )

      next()
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server is not responding',
        answer: err,
      })
    }
  },
  getChecks: async (req: Request, res: Response) => {
    try {
      const userId = req.user!.Id

      const [rows] = await pool.query<IProduct[]>(
        'SELECT * FROM Checks WHERE UserId = ?;',
        [userId]
      )

      res.status(200).json({
        message: 'You have successfully got checks of user',
        answer: rows,
      })
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server is not responding',
        answer: err,
      })
    }
  },
}
