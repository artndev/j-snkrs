export {}

declare global {
  export interface IAuthFormProps {
    formTitle: string
    onSubmit: (...args) => void
    err: IAxiosErrorResponse
    withEmail?: boolean
    withSocials?: boolean
  }

  export interface IProductBackProps {
    id: number
    name: string
    price: number
    currency: ICurrency
    description: string
    image: string
  }

  export interface IProductFrontProps {
    id: number
    name: string
    price: number
    currency: ICurrency
    description: string
    details: string
    sizes: Dictionary<{ M: string; W: string }[]>
    image: string
  }

  export interface IAccountProps {
    id: number | undefined
    username: string | undefined
    email: string | undefined
    googleId: string | undefined
    githubId: string | undefined
  }
}
