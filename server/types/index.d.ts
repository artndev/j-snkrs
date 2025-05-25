export {}
import { ResultSetHeader } from 'mysql2'

declare global {
  export interface IProduct extends ResultSetHeader {
    Id?: number
    Name: string
    Price: number
    Currency: string
    Description: string
    Image: string
    Details: string
    Sizes: string
    Updated: string
  }

  export interface IProductCheckout {
    currency: 'usd' | 'eur'
    description: string
    id: number
    image: string
    name: string
    price: number
    quantity: number
    totalProductPrice: number
    totalProductPriceCoded: string
    variant: {
      key: number
      color: string
      size: {
        M: string
        W: string
      }
    }
  }

  export interface IUser extends ResultSetHeader {
    Id?: number
    Username: string
    Password: string
    Email: string
    GoogleId: string | null
    GithubId: string | null
    Created: string
  }

  namespace Express {
    interface User extends IUser {}
  }

  export interface ICredentials {
    username: string
    password: string
    email: string
  }

  export interface ISave extends ResultSetHeader {
    ProductId: number
    UserId: number
  }
}
