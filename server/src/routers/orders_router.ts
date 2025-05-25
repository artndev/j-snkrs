import express from 'express'
import { ordersController } from '../controllers/_controllers.js'
import config from '../config.json' with { type: 'json' }

const router = express.Router()

router.get('/', ordersController.getChecks)

router.post('/checkout', ordersController.createCheckoutSession)

router.get('/success', ordersController.createCheck, (_req, res) => {
  res.redirect(`${config.CLIENT_URL}/history`)
})

router.get('/cancel', (_req, res) => {
  res.send('Transaction was cancelled')
})

export default router
