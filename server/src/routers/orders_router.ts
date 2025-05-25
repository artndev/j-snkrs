import express from 'express'
import { ordersController } from '../controllers/_controllers.js'

const router = express.Router()

router.post('/checkout', ordersController.createCheckoutSession)

export default router
