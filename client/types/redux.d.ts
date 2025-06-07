export {}
import { storeConfig } from '../src/persistor.js'

declare global {
  export type RootState = ReturnType<typeof storeConfig.getState>
  export type AppDispatch = typeof storeConfig.dispatch

  export interface IInitialState {
    products: Dictionary<Dictionary<ICart>>
    totalPrice: number
    globalCurrency: ICurrency
  }
}
