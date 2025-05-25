import express from 'express'
import { productsController } from '../controllers/_controllers.js'
import * as middlewares from '../middlewares.js'

const router = express.Router()

router.get('/', productsController.GetAll)

router.get('/:id', productsController.Get)

router.post('/create', middlewares.isAuthenticated, productsController.Create)

router.put(
  '/:id/update',
  middlewares.isAuthenticated,
  productsController.Update
)

router.delete(
  '/:id/delete',
  middlewares.isAuthenticated,
  productsController.Delete
)

export default router
