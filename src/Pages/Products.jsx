import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../Store/ProductSlice/product';
import { handleAddToCart } from '../Store/CartSlice/cart';
function Products() {
    const dispatch = useDispatch();
    const { productData, loading, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchData())
    }, [])
    if (loading) return <h1>Loading Products...</h1>
    if (error) return <h1>Error... Please Refresh</h1>
    function addToCart(){
        dispatch(handleAddToCart())
    }
    return (
        <div>
            <h1>Products</h1>
            <div className='w-full items-center justify-center flex gap-4 flex-wrap'>
                {
                    productData.map((item, key) => (
                        <div className='w-[200px] h-auto shadow-sm px-4 py-2'>
                            <div>
                                <img src={item.thumbnail} alt="" />
                            </div>
                            <div>
                                <h4>{item.title}</h4>
                                <h4>${item.price}</h4>
                            </div>
                            <div>
                                <div className='w-full'>
                                    <button className=' w-full p-3 mb-4 bg-gray-700 text-amber-200 rounded-2xl cursor-pointer'>Add to cart</button>
                                </div>
                                <div>
                                    <button  className='w-full p-3 bg-gray-700 text-amber-200 rounded-2xl cursor-pointer'>Add to favourites</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Products