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

      return {
        message: 'You have successfully authorized',
        answer: rows[0],
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

      const passwordHash = rows[0]!.Password
      const status = await bcrypt.compare(credentials.password, passwordHash)
      if (!status) throw new Error('Your authorization credentials are invalid')

      return {
        message: 'You have successfully authorized',
        answer: rows[0],
      }
    } catch (err) {
      console.log(err)

      throw new Error('Server is not responding')
    }
  },
  AttachGoogleId: async (data: {
    id: string | undefined
    googleId: string
  }) => {
    try {
      console.log(data.googleId)

      const [rows] = await pool.query<IUser[]>(
        'SELECT * FROM Users WHERE GoogleId = ?;',
        [data.googleId]
      )

      let user = rows[0]
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

        user = rows2[0]
      }

      if (!user) throw new Error('User is not found')

      return {
        message: 'You have successfully attached social id',
        answer: user,
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

      let user = rows[0]
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

        user = rows2[0]
      }

      if (!user) throw new Error('User is not found')

      return {
        message: 'You have successfully attached social id',
        answer: user,
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

      res.status(200).json({
        message: 'You have successfully unattached social id',
        answer: rows2[0],
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
          message: 'User is not found',
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

      res.status(200).json({
        message: 'You have successfully unattached social id',
        answer: rows2[0],
      })
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server is not responding',
        answer: null,
      })
    }
  },
  VerifyEmail: async (req: Request, id: number) => {
    try {
      const [rows] = await pool.query<ResultSetHeader>(
        `
          UPDATE Users SET Verified = TRUE
          WHERE Id = ?;
        `,
        [id]
      )

      if (!rows.affectedRows) throw new Error('User is not found')

      req.session!.passport!.user!.Verified = true
      req.session.save(err => {
        if (err) {
          console.log(err)
        }
      })

      const [rows2] = await pool.query<IUser[]>(
        'SELECT * FROM Users WHERE Id = ?',
        [id]
      )

      return {
        message: 'You have successfully verified email',
        answer: rows2[0],
      }
    } catch (err) {
      console.log(err)

      return {
        message: 'Server is not responding',
        answer: null,
      }
    }
  },
}
