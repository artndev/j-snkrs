export {}

declare global {
  export interface IAuthContext {
    auth: IUser | undefined
    setAuth: (auth: IUser | undefined) => void | undefined
  }

  export interface IUser {
    Id: number
    Username: string
    Password: string
    Email: string
    GoogleId: string | null
    GithubId: string | null
    Verified: boolean
    Created: string
  }

  export interface IProduct {
    Id: number
    Name: string
    Price: number
    Currency: ICurrency
    Description: string
    Details: string
    Sizes: string
    Image: string
    Updated: string
  }

  export interface IAuthFormData {
    id?: number
    username: string
    password: string
    email?: string
    otp?: string
    confirmOtp?: string
    confirmPassword?: string
  }

  export interface IVariant {
    color: string
    size: string
    image: string
  }

  export interface ICart extends IProductBackProps {
    id: number
    variant: IVariant
    quantity: number
  }

  export interface ICheck {
    ReferenceId: string
    LineItems: string
    TotalPrice: string
    UserId: number
  }

  export interface ILineItem {
    price_data: {
      currency: ICurrency
      product_data: {
        name: string
        images: string[]
        metadata: {
          id: number
        }
      }
      unit_amount: number
    }
    quantity: number
  }
}
