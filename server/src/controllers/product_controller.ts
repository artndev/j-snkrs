import type { ResultSetHeader } from 'mysql2'
import pool from '../pool.js'
import { Request, Response } from 'express'

export default {
  FindById: async (req: Request, res: Response) => {
    try {
      const [rows] = await pool.query<IProduct[]>(
        'SELECT * FROM Products WHERE Id = ?;',
        [req.params.id]
      )

      if (!rows.length) {
        res.status(404).json({
          message: 'Entry with this id is not found',
          answer: null,
        })
        return
      }

      res.status(200).json({
        message: 'You have successfully found entry with this id',
        answer: rows[0],
      })
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server is not responding',
        answer: null,
      })
    }
  },
}
