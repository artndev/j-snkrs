import express from 'express'
import { usersController } from '../controllers/_controllers.js'
import mailer from '../mailer.js'
import * as middlewares from '../middlewares.js'

const router = express.Router()

router.post('/admin', usersController.LoginAdmin)

router.put(
  '/update',
  middlewares.isAuthenticated,
  usersController.UpdateCurrent
) // ?withOtp= ?otp=

router.post('/otp', middlewares.isAuthenticated, mailer.sendOTP, (req, res) => {
  res.status(200).json({
    message: 'OTP has been successfully sent',
    answer: {
      otp: req.otp,
    },
  })
})

router.delete(
  '/delete',
  middlewares.isAuthenticated,
  usersController.DeleteCurrent
)

router.get('/status', middlewares.isAuthenticated, (req, res) => {
  res.status(200).json({
    message: 'You are authorized',
    answer: req.user,
  })
})

router.post('/logout', middlewares.isAuthenticated, (req, res) => {
  req.logout(err => {
    if (err) {
      res.status(500).json({
        message: 'Server is not responding',
        answer: null,
      })
      return
    }

    res.status(200).json({
      message: 'You have successfully logged out',
      answer: true,
    })
  })
})

export default router
