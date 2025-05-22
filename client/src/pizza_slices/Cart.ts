import { createSlice, current } from '@reduxjs/toolkit'
import config from '../config.json' with { type: 'json' }

const initialState: IInitialState = {
  products: {},
  totalPrice: 0,
  globalCurrency: 'usd',
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { id, variant, price } = action.payload
      let idProducts = state.products[id]

      if (!idProducts) idProducts = state.products[id] = {}

      if (!idProducts[JSON.stringify(variant)]) {
        state.products[id]![JSON.stringify(variant)] = action.payload
        state.totalPrice += price
        return
      }

      state.products[id]![JSON.stringify(variant)]!.quantity += 1
      state.totalPrice += state.products[id]![JSON.stringify(variant)]!.price
    },
    removeProduct: (state, action) => {
      const { id, variant } = action.payload
      let idProducts = state.products[id]

      if (!idProducts) idProducts = state.products[id] = {}

      if (!idProducts[JSON.stringify(variant)]) return

      state.products[id]![JSON.stringify(variant)]!.quantity -= 1
      state.totalPrice -= state.products[id]![JSON.stringify(variant)]!.price

      if (state.products[id]![JSON.stringify(variant)]!.quantity === 0)
        delete state.products[id]![JSON.stringify(variant)]

      if (Object.keys(state.products[id]!).length === 0)
        delete state.products[id]
    },
  },
  selectors: {
    getTotalPrice: state => {
      return `${state.totalPrice}${config.currencyCodes[state.globalCurrency]}`
    },
  },
})

export const { addProduct, removeProduct } = cartSlice.actions
export const { getTotalPrice } = cartSlice.selectors

export default cartSlice.reducer
