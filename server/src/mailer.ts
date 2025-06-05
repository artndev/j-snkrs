import dotenv from 'dotenv'
dotenv.config()

import { Request, Response, NextFunction } from 'express'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

const sendMail = async (to: string[], subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      type: 'OAuth2',
      user: process.env.NODEMAILER_USER,
      clientId: process.env.NODEMAILER_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NODEMAILER_GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.NODEMAILER_GOOGLE_REFRESH_TOKEN,
    },
    tls: { rejectUnauthorized: false }, // only for localhost
  })

  return transporter
    .sendMail({
      to: to,
      from: `ArtBot <${process.env.NODEMAILER_USER}>`,
      subject: subject,
      html: html,
    })
    .then(() => {
      return {
        message: 'Email has been successfully sent',
        answer: true,
      }
    })
    .catch(err => {
      console.log(err)

      return {
        message: 'Server is not responding',
        answer: null,
      }
    })
}

const sendOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body?.email
    console.log(email, req.body)
    if (!email) {
      res.status(404).json({
        message: 'Email has not been found',
        answer: null,
      })
      return
    }

    const otp = crypto.randomInt(100000, 999999).toString()
    await sendMail(email, 'Confirmation Code', `Your code is ${otp}`)

    console.log('Mail is sent. Code is ', otp)
    req.otp = otp
    next()
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server is not responding',
      answer: null,
    })
  }
}

// ! VPN is breaking everything down
// https://masashi-k.blogspot.com/2013/06/sending-mail-with-gmail-using-xoauth2.html
export default {
  sendMail,
  sendOTP,
}
