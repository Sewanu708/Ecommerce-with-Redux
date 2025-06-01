import { configureStore } from "@reduxjs/toolkit";
import productReducer from './ProductSlice/product'
import cartReducer from './CartSlice/cart'

export const store = configureStore({
    reducer: {
        products: productReducer,
        carts: cartReducer
    }
})