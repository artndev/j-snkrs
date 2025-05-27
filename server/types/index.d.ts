export {}
import { JwtPayload } from 'jsonwebtoken'
import { ResultSetHeader } from 'mysql2'

declare global {
  export interface IProduct extends ResultSetHeader {
    Id: number
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
    currency: ICurrency
    description: string
    id: number
    image: string
    name: string
    price: number
    quantity: number
    totalProductPrice: number
    totalProductPriceCoded: string
    variant: {
      color: string
      size: ISize
      image: string
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

  export interface ICredentials {
    username: string
    password: string
    email: string
  }

  export interface ISave extends ResultSetHeader {
    ProductId: number
    UserId: number
  }

  export interface IJwtPayload extends JwtPayload {
    jti: string
    referenceId: string
    lineItems: string
    totalPrice: string
  }
}
