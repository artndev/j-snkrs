import express from 'express'
import { productController } from '../controllers/_controllers.js'

const router = express.Router()

router.get('/:id', productController.FindById)

export default router
