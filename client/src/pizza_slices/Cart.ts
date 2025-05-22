import { createSlice, current } from '@reduxjs/toolkit'

const initialState: {
  products: Dictionary<Dictionary<ICart>>
  totalPrice: number
} = {
  products: {},
  totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { id, variant, ...payload } = action.payload
      const product = state.products[id]
      if (!product || !product[JSON.stringify(variant)]) {
        if (!state.products[id]) state.products[id] = {}
        state.products[id][JSON.stringify(variant)] = payload
        return
      }

      state.products[id]![JSON.stringify(variant)]!.quantity += 1
    },
    removeProduct: (state, action) => {
      const { id, variant } = action.payload
      const product = state.products[id]
      if (!product || !product[JSON.stringify(variant)]) return

      state.products[id]![JSON.stringify(variant)]!.quantity -= 1
      if (!state.products[id]![JSON.stringify(variant)]!.quantity)
        delete state.products[id]
    },
  },
})

export const { addProduct, removeProduct } = cartSlice.actions

export default cartSlice.reducer
