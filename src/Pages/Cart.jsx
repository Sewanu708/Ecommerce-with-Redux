import { Link } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { handleQunatityChange, handleInputQuantity, handleDelete } from '../Store/CartSlice/cart';
function Cart() {
    const { cartList } = useSelector(state => state.carts);
    const dispatch = useDispatch()
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
                    Cart
                </div>
                <Link to={'/'} className='text-blue-500'>
                    Product
                </Link>
            </div>
            <div className='w-full items-center justify-center flex gap-4 flex-wrap'>
                <table className="w-[880px] shadow-sm border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left px-4 py-2">Name</th>
                            <th className="text-left px-4 py-2">Price</th>
                            <th className="text-left px-4 py-2">Quantity</th>
                            <th className="text-left px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartList.map((item, index) => (
                                <tr className="border-t" key={index}>
                                    <td className="px-4 py-2">{item.title}</td>
                                    <td className="px-4 py-2">${Math.floor(item.price * item.quantity)}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center space-x-2">
                                            <p className="cursor-pointer" onClick={() => {
                                                quantityChange('decrease', item.id)
                                            }}>-</p>
                                            <input
                                                type="number"
                                                min={1}
                                                value={+item.quantity}
                                                className="w-12 text-center border rounded"
                                                onChange={(e) => {
                                                    quantityInputChange(e.target.value, item.id)
                                                }}
                                            />
                                            <p className="cursor-pointer" onClick={() => {
                                                quantityChange('increase', item.id)
                                            }}>+</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button onClick={() => {
                                            dispatch(handleDelete({ id: item.id }))
                                        }} className="w-full p-2 bg-gray-700 text-amber-200 rounded-2xl cursor-pointer">
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>
            <div className='text-center mt-4'>
                {
                    cartList?.length === 0 && <h1>No Products</h1>
                }
            </div>
        </div>
    )
}

export default Cart


