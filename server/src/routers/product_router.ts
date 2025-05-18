import express from 'express'
import { productController } from '../controllers/_controllers.js'

const router = express.Router()

router.get('/', productController.GetAll)

router.get('/:id', productController.Get)

router.post('/create', productController.Create)

router.put('/:id/update', productController.Update)

router.delete('/:id/delete', productController.Delete)

export default router
