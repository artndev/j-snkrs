export {}
import { storeConfig } from './src/storeConfig'

declare global {
  export type RootState = ReturnType<typeof storeConfig.getState>
  export type AppDispatch = typeof storeConfig.dispatch
}
