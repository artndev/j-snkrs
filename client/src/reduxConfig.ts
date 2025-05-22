import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from './pizza_slices/Cart'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  cart: cartReducer,
})

const persistedProductsReducer = persistReducer(persistConfig, rootReducer)

export const storeConfig = configureStore({
  reducer: persistedProductsReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export const persistor = persistStore(storeConfig)
