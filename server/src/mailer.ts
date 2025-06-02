import dotenv from 'dotenv'
dotenv.config()

import nodemailer from 'nodemailer'

// ! VPN is breaking everything down
// https://masashi-k.blogspot.com/2013/06/sending-mail-with-gmail-using-xoauth2.html
export default {
  sendMail: async (to: string[], subject: string, html: string) => {
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
      tls: { rejectUnauthorized: false },
    })

    return transporter
      .sendMail({
        to: to,
        from: process.env.NODEMAILER_USER,
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
  },
}
