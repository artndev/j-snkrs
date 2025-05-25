import express from 'express'
import { savesController } from '../controllers/_controllers.js'

const router = express.Router()

router.post('/:id/save', savesController.Save)

router.post('/:id/unsave', savesController.Unsave)

router.get('/', savesController.GetSaves)

router.get('/:id/state', savesController.GetState)

export default router
