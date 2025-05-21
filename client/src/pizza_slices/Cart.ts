import { createSlice, current } from '@reduxjs/toolkit'

const initialState: { products: ICart[]; totalPrice: number } = {
  products: [],
  totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const res = state.products.filter((val, _i) => {
        const cur = current(val)
        return (
          cur.id === action.payload.id &&
          JSON.stringify(cur.variant) === JSON.stringify(action.payload.variant)
        )
      })

      if (!res.length) {
        state.products = [...state.products, action.payload]
        return
      }

      state.products = state.products.map((val, i) => {
        const cur = current(val)
        if (
          cur.id === action.payload.id &&
          JSON.stringify(cur.variant) === JSON.stringify(action.payload.variant)
        ) {
          state.totalPrice += cur.price
          val.quantity += 1
        }

        // console.log(state.totalPrice)
        return val
      })
    },
    popProduct: state => {
      state.products.pop()
    },
  },
})

export const { addProduct } = cartSlice.actions

export default cartSlice.reducer
