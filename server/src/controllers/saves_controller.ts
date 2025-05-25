import type { ResultSetHeader } from 'mysql2'
import pool from '../pool.js'
import { Request, Response } from 'express'

export default {
  Save: async (req: Request, res: Response) => {
    try {
      const userId = req.user!.Id

      const [rows] = await pool.query<IProduct[]>(
        'SELECT * FROM Saves WHERE ProductId = ? AND UserId = ?;',
        [req.params.id, userId]
      )

      if (rows.length) {
        res.status(400).json({
          message: 'You have already saved product',
          answer: null,
        })
        return
      }

      await pool.query<ResultSetHeader>(
        'INSERT INTO Saves (ProductId, UserId) VALUES (?, ?);',
        [req.params.id, userId]
      )

      res.status(200).json({
        message: 'You have successfully saved product',
        answer: true,
      })
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server is not responding',
        answer: err,
      })
    }
  },
  Unsave: async (req: Request, res: Response) => {
    try {
      const userId = req.user!.Id

      const [rows] = await pool.query<ResultSetHeader>(
        'DELETE FROM Saves WHERE ProductId = ? AND UserId = ?;',
        [req.params.id, userId]
      )

      if (!rows.affectedRows) {
        res.status(400).json({
          message: 'You have already unsaved product',
          answer: null,
        })
        return
      }

      res.status(200).json({
        message: 'You have successfully unsaved product',
        answer: true,
      })
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server is not responding',
        answer: err,
      })
    }
  },
  GetSaves: async (req: Request, res: Response) => {
    try {
      const userId = req.user!.Id

      const [rows] = await pool.query<IProduct[]>(
        `
          SELECT 
            Products.Id,
            Products.Name,
            Products.Price,
            Products.Currency,
            Products.Description,
            Products.Image,
            Products.Updated,
            Products.Details,
            Products.Sizes
          FROM Products
          LEFT JOIN Saves ON Products.Id = Saves.ProductId
          WHERE Saves.UserId = ?;
        `,
        [userId]
      )

      res.status(200).json({
        message: 'You have successfully got saves of user',
        answer: rows,
      })
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server is not responding',
        answer: err,
      })
    }
  },
  GetState: async (req: Request, res: Response) => {
    try {
      const userId = req.user!.Id

      const [rows] = await pool.query<IProduct[]>(
        'SELECT * FROM Products WHERE Id = ?',
        req.params.id
      )

      if (!rows.length) {
        res.status(404).json({
          message: 'The article with such id cannot be found',
          answer: null,
        })
        return
      }

      const [rows2] = await pool.query<ISave[]>(
        'SELECT * FROM Saves WHERE ProductId = ? AND UserId = ?;',
        [req.params.id, userId]
      )

      res.status(200).json({
        message: 'You have successfully got saves-state of article',
        answer: rows2.length ? true : false,
      })
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server is not responding',
        answer: err,
      })
    }
  },
}
