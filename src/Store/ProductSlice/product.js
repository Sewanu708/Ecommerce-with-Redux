import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk('Products', async (__dirname, { rejectWithValue }) => {
    
    try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) throw new Error(response.statusText);
        const result = await response.json();
        return result.products
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
const initialState = {
    loading: true,
    productData: [],
    error: ''
}
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: (builders) => {
        builders.addCase(fetchData.pending, (state) =>{ state.loading = true}).addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false;
            state.productData = action.payload
        }).addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default productSlice.reducer;