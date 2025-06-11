import dotenv from 'dotenv'
dotenv.config()

import { Request, Response, NextFunction } from 'express'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import config from './config.json' with { type: 'json' }

const sendMail = async (to: string[], subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    // tls: { rejectUnauthorized: false }, // only for localhost
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
    await sendMail(
      email,
      'Confirmation Code',
      `<div style="width: 200px; height: 200px; border-radius: calc(.625rem + 4px); overflow: hidden;"> <img src="${config.SERVER_URL}/api/static/cat.jpg" style="width: 100%; object-fit: cover;" /> </div> <br /> Your code is ${otp}`
    )

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

// ;(async () => {
//   console.log('SENT', process.env.MAIL_PASSWORD)
//   await sendMail(['agressorios@gmail.com'], 'Test', 'Test')
//   console.log('RECEIVED')
// })()

// ! VPN is breaking everything down
// https://account.mail.ru/user/2-step-auth/passwords/
// https://masashi-k.blogspot.com/2013/06/sending-mail-with-gmail-using-xoauth2.html
export default {
  sendMail,
  sendOTP,
}
