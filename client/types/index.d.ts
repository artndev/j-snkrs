export {}
import { AxiosResponse } from 'axios'

declare global {
  export interface IUser {
    Id?: number
    Username: string
    Password: string
    Email: string
    GoogleId: string
    GithubId: string
    Created: string
  }

  export interface IAuthContext {
    auth: IUser | undefined
    setAuth: (auth: IUser | undefined) => void | undefined
  }

  export interface IAuthFormData {
    username: string
    password: string
    email?: string
  }

  export type IAxiosErrorResponse = AxiosResponse | undefined

  export interface Dictionary<T> {
    [Key: string]: T
  }

  export interface ISize {
    size: {
      M: string
      W: string
    }
  }

  export interface IVariant extends ISize {
    key: number
    color: string
  }

  export interface ICart extends IProductBackProps {
    id: number
    variant: IVariant
    quantity: number
  }

  export type ICurrency = 'usd' | 'eur'
}
