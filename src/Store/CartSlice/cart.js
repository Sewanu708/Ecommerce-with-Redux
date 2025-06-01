import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartList: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        handleAddToCart: (state, action) => {
            const { details } = action.payload
            state.cartList.push(details)
        }
    }
})

export const { handleAddToCart } = cartSlice.actions;
export default cartSlice.reducer