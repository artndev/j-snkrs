import express from 'express'
import { productsController } from '../controllers/_controllers.js'
import { isAuthenticated } from '../middlewares.js'

const router = express.Router()

router.get('/', productsController.GetAll)

router.get('/:id', productsController.Get)

router.post('/create', isAuthenticated, productsController.Create)

router.put('/:id/update', isAuthenticated, productsController.Update)

router.delete('/:id/delete', isAuthenticated, productsController.Delete)

export default router
