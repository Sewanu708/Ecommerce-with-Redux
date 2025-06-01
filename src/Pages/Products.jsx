import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../Store/ProductSlice/product';
import { handleAddToCart, handleQunatityChange, handleInputQuantity } from '../Store/CartSlice/cart';
import { Link } from 'react-router';
function Products() {
    const dispatch = useDispatch();
    const { productData, loading, error } = useSelector(state => state.products);
    const { cartList } = useSelector(state => state.carts);
    useEffect(() => {
        if (productData.length === 0) {
            dispatch(fetchData())
        }
    }, [productData.length, dispatch])
    if (loading) return <h1>Loading Products...</h1>
    if (error) return <h1>Error... Please Refresh</h1>
    function addToCart(details) {
        dispatch(handleAddToCart({ details }))
    }
    function quantityChange(type, id) {
        dispatch(handleQunatityChange({ type, id }))
    }
    function quantityInputChange(value, id) {
        dispatch(handleInputQuantity({ value, id }))
    }
    return (
        <div>
            <div className='flex justify-between p-4'>
                <div>
                    Products
                </div>
                <Link to={'/cart'} className='text-blue-500'>
                    Cart
                </Link>
            </div>
            <div className='w-full items-center justify-center flex gap-4 flex-wrap'>
                {
                    productData.map((item, index) => {

                        return (
                            <div key={index} className='w-[200px] h-auto shadow-sm px-4 py-2'>
                                <div>
                                    <img src={item.thumbnail} alt="" />
                                </div>
                                <div>
                                    <h4>{item.title}</h4>
                                    <h4>${item.price}</h4>
                                </div>
                                <div>
                                    <div className='w-full'>
                                        {
                                            cartList.find(cartItem => cartItem?.id === item.id) ? <div className="flex items-center space-x-2">
                                                <p className="cursor-pointer" onClick={() => {
                                                    quantityChange('decrease', item.id)
                                                }}>-</p>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    value={cartList.find(cartItem => cartItem?.id === item.id).quantity}
                                                    className="w-12 text-center border rounded"
                                                    onChange={(e) => {
                                                        quantityInputChange(e.target.value, item.id)
                                                    }}
                                                />
                                                <p className="cursor-pointer" onClick={() => {
                                                    quantityChange('increase', item.id)
                                                }}>+</p>
                                            </div> : <button className=' w-full p-3 mb-4 bg-gray-700 text-amber-200 rounded-2xl cursor-pointer' onClick={() => addToCart(item)}>Add to cart</button>
                                        }

                                    </div>
                                    <div>
                                        <button className='w-full p-3 bg-gray-700 text-amber-200 rounded-2xl cursor-pointer'>Add to favourites</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Products