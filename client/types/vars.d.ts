export {}

declare global {
  export interface Dictionary<T> {
    [Key: string]: T
  }

  export type ISize = {
    M: string
    W: string
  }

  export type ICurrency = 'usd' | 'eur'
}
