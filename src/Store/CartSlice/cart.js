import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartList: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        handleAddToCart: (state, action) => {
            const { details } = action.payload;
            const cpyData = [...state.cartList]
            cpyData.push({ ...details, quantity: 1 })
            state.cartList = cpyData;
        },
        handleQunatityChange: (state, action) => {
            const { type, id } = action.payload;
            const cpyData = [...state.cartList]
            cpyData.map((item, index) => {
                if ((item.id === id) && type === 'increase') {
                    cpyData[index].quantity += 1;
                } else if ((item.id === id) && type === 'decrease') {
                    if (cpyData[index].quantity === 1) return
                    cpyData[index].quantity -= 1;
                }
            })
            state.cartList = cpyData;

        },
        handleInputQuantity: (state, action) => {
            const { value, id } = action.payload;
            const cpyData = [...state.cartList]
            cpyData.map((item, index) => {
                if (item.id === id) {
                    cpyData[index].quantity = parseInt(value);
                }
            })
            state.cartList = cpyData;
        },
        handleDelete: (state, action) => {
            const { id } = action.payload;
            const cpyData = state.cartList.filter(item => item.id != id);
            console.log(cpyData,'new')
            state.cartList = cpyData;
        }
    }
})

export const { handleAddToCart, handleInputQuantity, handleDelete, handleQunatityChange } = cartSlice.actions;
export default cartSlice.reducer