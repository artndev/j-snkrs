import express from 'express'
import { ordersController } from '../controllers/_controllers.js'
import { isAuthenticated } from '../middlewares.js'

const router = express.Router()

router.post(
  '/checkout',
  isAuthenticated,
  ordersController.createCheckoutSession
)

export default router
