export {}
import React from 'react'

declare global {
  export interface IAuthFormProps {
    formTitle: string
    onSubmit: (...args) => any
    err?: boolean
    errDescription?: string | React.ReactNode
    withEmail?: boolean
    withSocials?: boolean
  }

  export interface IAuthFormDialogProps {
    formTitle: string
    formDescription: string
    onSubmit: (...args) => any
    err?: boolean
    errDescription?: string | React.ReactNode
    trigger?: React.ReactNode
    inputs: {
      name: 'email' | 'username' | 'password' | 'confirmPassword' | 'otp'
      label: string
      description?: string | React.ReactNode
      type?: 'otp' | 'email' | 'text' | 'password'
      pattern?: RegExp
      placeholder?: string
      defaultValue?: string | undefined // because of unauthorized users
    }[]
    dirtyValues?: {
      username?: string
      email?: string
    }
    opened: boolean | undefined
    setOpened: (...args) => void
  }

  export interface IAuthFormDialogsProps {
    modalProps: Omit<
      IAuthFormDialogProps,
      'opened' | 'setOpened' | 'err' | 'errDescription'
    >
    submodalProps: Omit<
      IAuthFormDialogProps,
      'opened' | 'setOpened' | 'err' | 'errDescription'
    >
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
