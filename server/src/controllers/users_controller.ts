import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import type { ResultSetHeader } from 'mysql2'
import pool from '../pool.js'

export default {
  Register: async (credentials: ICredentials, verified?: boolean) => {
    try {
      const salt = await bcrypt.genSalt(10)
      const passwordHash = await bcrypt.hash(credentials.password, salt)

      await pool.query<ResultSetHeader>(
        'INSERT INTO Users (Username, Password, Email, Verified) VALUES (?, ?, ?, ?);',
        [
          credentials.username,
          passwordHash,
          credentials.email,
          verified ?? false,
        ]
      )

      const [rows] = await pool.query<IUser[]>(
        'SELECT * FROM Users WHERE Username = ?;',
        [credentials.username]
      )

      const { Password, ...userPayload } = rows[0]!
      return {
        message: 'You have successfully authorized',
        answer: userPayload,
      }
    } catch (err) {
      console.log(err)

      throw new Error('Server is not responding')
    }
  },
  Login: async (credentials: Omit<ICredentials, 'email'>) => {
    try {
      const [rows] = await pool.query<IUser[]>(
        'SELECT * FROM Users WHERE Username = ?;',
        [credentials.username]
      )

      if (!rows.length)
        throw new Error('Your authorization credentials are invalid')

      const { Password, ...userPayload } = rows[0]!
      const status = await bcrypt.compare(credentials.password, Password!)
      if (!status) throw new Error('Your authorization credentials are invalid')

      return {
        message: 'You have successfully authorized',
        answer: userPayload,
      }
    } catch (err) {
      console.log(err)

      throw new Error('Server is not responding')
    }
  },
  UpdateCurrent: async (req: Request, res: Response) => {
    try {
      let { id, otp, confirmOtp, confirmPassword, ...bodyPayload } = req.body
      if (req.query?.withOtp === 'true' && otp !== confirmOtp) {
        res.status(400).json({
          message: 'Confirmation OTP is invalid',
          answer: null,
        })
        return
      }

      if (!req.query?.withOtp) {
        const [rows] = await pool.query<IUser[]>(
          'SELECT * FROM Users WHERE Id = ?;',
          [id]
        )

        const status = await bcrypt.compare(confirmPassword, rows[0]!.Password!)
        if (!status) {
          res.status(400).json({
            message: 'Confirmation password is invalid',
            answer: null,
          })
          return
        }
      }

      if (bodyPayload['password']) {
        const salt = await bcrypt.genSalt(10)
        bodyPayload['password'] = await bcrypt.hash(
          bodyPayload['password'],
          salt
        )
      }

      const keys = Object.keys(bodyPayload)
      const values = await keys.map(key => bodyPayload[key])
      const clause = keys
        .map(key => `${key.charAt(0).toUpperCase() + key.substring(1)} = ?`)
        .join(',')

      const [rows2] = await pool.query<ResultSetHeader>(
        `
        UPDATE Users SET ${clause}
        WHERE Id = ?;
      `,
        [...values, req.user!.Id]
      )

      if (!rows2.affectedRows) {
        res.status(404).json({
          message: 'User has not been found',
          answer: null,
        })
        return
      }

      const [rows3] = await pool.query<IUser[]>(
        'SELECT * FROM Users WHERE Id = ?;',
        [req.user!.Id]
      )

      req.session!.passport!.user = rows3[0]
      req.session.save(err => {
        if (err) {
          console.log(err)
        }
      })

      res.status(200).json({
        message: 'User has been successfully updated',
        answer: true, // because modals update href
      })
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server is not responding',
        answer: true,
      })
    }
  },
  DeleteCurrent: async (req: Request, res: Response) => {
    const [rows] = await pool.query<ResultSetHeader>(
      `
        DELETE Saves, Checks
        FROM Saves
        JOIN Checks ON 
        Saves.UserId = Checks.UserId
        WHERE Saves.UserId = ?;
      `,
      [req.user!.Id]
    )

    if (!rows.affectedRows) {
      res.status(404).json({
        message: 'User has not been found',
        answer: null,
      })
      return
    }

    req.session!.passport!.user = undefined
    req.session.save(err => {
      if (err) {
        console.log(err)
      }
    })

    res.status(404).json({
      message: 'User has been successfully updated',
      answer: true,
    })
  },
  AttachGoogleId: async (data: {
    id: string | undefined
    googleId: string
  }) => {
    try {
      const [rows] = await pool.query<IUser[]>(
        'SELECT * FROM Users WHERE GoogleId = ?;',
        [data.googleId]
      )

      let { Password, ...userPayload } = rows[0] ?? {}
      if (data.id) {
        await pool.query<ResultSetHeader>(
          `
            UPDATE Users SET GoogleId = ?
            WHERE Id = ?;
          `,
          [data.googleId, Number(data.id)]
        )

        const [rows2] = await pool.query<IUser[]>(
          'SELECT * FROM Users WHERE GoogleId = ?;',
          [data.googleId]
        )

        const { Password: Password2, ...userPayload2 } = rows2[0]!
        userPayload = userPayload2
      }

      if (!userPayload) throw new Error('User is not found')

      return {
        message: 'You have successfully attached social id',
        answer: userPayload,
      }
    } catch (err) {
      console.log(err)

      throw new Error('Server is not responding')
    }
  },
  AttachGithubId: async (data: {
    id: string | undefined
    githubId: string
  }) => {
    try {
      const [rows] = await pool.query<IUser[]>(
        'SELECT * FROM Users WHERE GithubId = ?;',
        [data.githubId]
      )

      let { Password, ...userPayload } = rows[0] ?? {}
      if (data.id) {
        await pool.query<ResultSetHeader>(
          `
            UPDATE Users SET GithubId = ?
            WHERE Id = ?;
          `,
          [data.githubId, Number(data.id)]
        )

        const [rows2] = await pool.query<IUser[]>(
          'SELECT * FROM Users WHERE GithubId = ?;',
          [data.githubId]
        )

        const { Password: Password2, ...userPayload2 } = rows2[0]!
        userPayload = userPayload2
      }

      if (!userPayload) throw new Error('User has not been found')

      return {
        message: 'You have successfully attached social id',
        answer: userPayload,
      }
    } catch (err) {
      console.log(err)

      throw new Error('Server is not responding')
    }
  },
  UnattachGithubId: async (req: Request, res: Response) => {
    try {
      const [rows] = await pool.query<ResultSetHeader>(
        `
          UPDATE Users SET GithubId = NULL
          WHERE Id = ?;
        `,
        [req.user!.Id]
      )

      if (!rows.affectedRows) {
        res.status(404).json({
          message: 'User is not found',
          answer: null,
        })
        return
      }

      const [rows2] = await pool.query<IUser[]>(
        'SELECT * FROM Users WHERE Id = ?;',
        [req.user!.Id]
      )

      req.session!.passport!.user!.GithubId = null
      req.session.save(err => {
        if (err) {
          console.log(err)
        }
      })

      const { Password, ...userPayload } = rows2[0]!
      res.status(200).json({
        message: 'You have successfully unattached social id',
        answer: userPayload,
      })
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server is not responding',
        answer: null,
      })
    }
  },
  UnattachGoogleId: async (req: Request, res: Response) => {
    try {
      const [rows] = await pool.query<ResultSetHeader>(
        `
          UPDATE Users SET GoogleId = NULL
          WHERE Id = ?;
        `,
        [req.user!.Id]
      )

      if (!rows.affectedRows) {
        res.status(404).json({
          message: 'User has not been found',
          answer: null,
        })
        return
      }

      const [rows2] = await pool.query<IUser[]>(
        'SELECT * FROM Users WHERE Id = ?;',
        [req.user!.Id]
      )

      req.session!.passport!.user!.GoogleId = null
      req.session.save(err => {
        if (err) {
          console.log(err)
        }
      })

      const { Password, ...userPayload } = rows2[0]!
      res.status(200).json({
        message: 'You have successfully unattached social id',
        answer: userPayload,
      })
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server is not responding',
        answer: null,
      })
    }
  },
  // VerifyEmail: async (req: Request, id: number) => {
  //   try {
  //     const [rows] = await pool.query<ResultSetHeader>(
  //       `
  //         UPDATE Users SET Verified = TRUE
  //         WHERE Id = ?;
  //       `,
  //       [id]
  //     )

  //     if (!rows.affectedRows) throw new Error('User is not found')

  //     req.session!.passport!.user!.Verified = true
  //     req.session.save(err => {
  //       if (err) {
  //         console.log(err)
  //       }
  //     })

  //     const [rows2] = await pool.query<IUser[]>(
  //       'SELECT * FROM Users WHERE Id = ?',
  //       [id]
  //     )

  //     return {
  //       message: 'You have successfully verified email',
  //       answer: rows2[0],
  //     }
  //   } catch (err) {
  //     console.log(err)

  //     return {
  //       message: 'Server is not responding',
  //       answer: null,
  //     }
  //   }
  // },
}
