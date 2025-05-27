export {}

declare global {
  export interface Dictionary<T> {
    [Key: string]: T
  }

  export type ISize = {
    sizes: string[]
    image: string
  }

  export type ICurrency = 'usd' | 'eur'
}
