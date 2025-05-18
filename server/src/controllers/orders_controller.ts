import { Request, Response } from 'express'
import config from '../config.json' with { type: 'json' }
import { stripe } from '../index.js'

export default {
  createCheckoutSession: async (req: Request, res: Response) => {
    try {
      const lineItems = req.body.products.map((product: IProductCheckout) => ({
        price_data: {
          currency: product.Currency,
          product_data: {
            name: product.Name,
          },
          unit_amount: Math.round(product.Price * 100), // bc dollars
        },
        quantity: product.Quantity,
      }))

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${config.CLIENT_URL}/success`,
        cancel_url: `${config.CLIENT_URL}/cancel`,
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
