import express from 'express'
import { usersController } from '../controllers/_controllers.js'
import mailer from '../mailer.js'

const router = express.Router()

router.put('/update', usersController.UpdateCurrent) // ?otp=

router.post('/otp', mailer.sendOTP, (req, res) => {
  res.status(200).json({
    message: 'OTP has been successfully sent',
    answer: {
      otpOriginal: req.otp,
    },
  })
})

router.delete('/delete', usersController.DeleteCurrent)

router.get('/status', (req, res) => {
  res.status(200).json({
    message: 'You are authorized',
    answer: req.user,
  })
})

router.post('/logout', (req, res) => {
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
