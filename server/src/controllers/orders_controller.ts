import dotenv from 'dotenv'
dotenv.config()

import { Request, Response } from 'express'
import { Stripe } from 'stripe'
import config from '../config.json' with { type: 'json' }

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

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${config.CLIENT_URL}/account`,
        cancel_url: `${config.CLIENT_URL}/fallback`,
      })

      res.status(200).json({
        message: 'You have successfully handled transaction',
        answer: {
          id: session.id,
        },
      })
    } catch (err) {
      console.error(err)

      res.status(500).json({
        message: 'Server is not responding',
        answer: null,
      })
    }
  },
}
