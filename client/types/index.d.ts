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

  export interface IAuthFormProps {
    formTitle: string
    onSubmit: (...args) => void
    err: IAxiosErrorResponse
    withEmail?: boolean
    withSocials?: boolean
  }
}
