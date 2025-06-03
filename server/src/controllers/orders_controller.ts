import dotenv from 'dotenv'
dotenv.config()

import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Stripe } from 'stripe'
import { v4 as uuidv4 } from 'uuid'
import config from '../config.json' with { type: 'json' }
import pool from '../pool.js'

const stripe = new Stripe(process.env.STRIPE_SECRET!)
export default {
  createCheckoutSession: async (req: Request, res: Response) => {
    try {
      const lineItems = req.body.products.map((product: IProductCheckout) => ({
        price_data: {
          currency: product.currency,
          product_data: {
            name: `${product.name} • ${product.variant.color} • ${product.variant.size}`,
            images: [product.variant.image],
            metadata: {
              id: product.id,
            },
          },
          unit_amount: Math.round(product.price * 100), // dollars
        },
        quantity: product.quantity,
      }))
      const referenceId = uuidv4()

      const token = jwt.sign(
        {
          jti: uuidv4(),
          referenceId: referenceId,
          lineItems: JSON.stringify(lineItems),
          totalPrice: req.body.totalPrice,
        },
        process.env.JWT_SECRET!,
        {
          algorithm: 'HS256',
          expiresIn: '1h',
        }
      )

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${config.SERVER_URL}/api/orders/success?token=${token}`,
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
