export {}

declare global {
  export interface IAuthFormProps {
    formTitle: string
    onSubmit: (...args) => void
    err: boolean
    withEmail?: boolean
    withSocials?: boolean
  }

  export interface IProductFrontProps {
    id: number
    name: string
    price: number
    currency: ICurrency
    description: string
    details: string
    sizes: Dictionary<ISize>
    image: string
  }

  export interface IProductBackProps {
    id: number
    name: string
    price: number
    currency: ICurrency
    description: string
    image: string
  }

  export interface IHistoryProps {
    history: ICheck[]
  }

  export interface IAccountProps {
    id: number | undefined
    username: string | undefined
    email: string | undefined
    googleId: string | null | undefined
    githubId: string | null | undefined
    verified: boolean | undefined
    saves: IProduct[] | undefined
  }
}
