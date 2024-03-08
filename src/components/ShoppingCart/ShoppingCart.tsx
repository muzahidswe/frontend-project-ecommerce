import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppState, useAppDispatch } from "../../redux/store/store";
import { ProductCart } from "../../misc/type";
import { DEFAULT_IMAGE_URL } from '../../utils/apiUtils';
import { increaseQuantity, decreaseQuantity, removeItem } from "../../redux/slices/cartSlice";

const ShoppingCart = () => {
    const dispatch = useAppDispatch();
    const cartItems = useSelector((state: AppState) => state.carts.carts);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCharge = 10;
    const cartTotal = total + shippingCharge;


    const handleImageError = (event: any) => {
        // Set a default image if the original image fails to load
        event.target.src = DEFAULT_IMAGE_URL;
    };

    function increaseQuantityHandler(item: ProductCart) {
        dispatch(increaseQuantity(item));
    }

    function decreaseQuantityHandler(item: ProductCart) {
        if (item.quantity === 1) {
            toast.error('Minimum Quantity is 1.', { position: 'top-right' });

        } else {
            dispatch(decreaseQuantity(item));
        }
    }

    const handleRemoveItem = (itemId: any) => {
        dispatch(removeItem(itemId));
        toast.success('Quantity Removed successfully!', { position: 'top-right' });
    };

    return (
        <>
            <div className="col-span-9 space-y-4">
                <h2 className="text-3xl font-medium uppercase mb-2">Shopping Cart</h2>

                <ToastContainer position="top-right" />

                {cartItems.map((item: any, index: any) => (
                    <div key={item.id} className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                        <div className="w-28">
                            <img src={item.images[0]} alt="product 6" className="w-full" onError={handleImageError} />
                        </div>
                        <div className="w-1/3">
                            <h2 className="text-gray-800 text-xl font-medium uppercase">{item.title}</h2>
                            <p className="text-gray-500 text-sm">Availability: <span className="text-green-600">In Stock</span></p>
                        </div>
                        <div className="mt-4">
                            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max" style={{ margin: '-25% 0%' }}>
                                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"><button onClick={() => decreaseQuantityHandler(item)}>-</button></div>
                                <div className="h-8 w-8 text-base flex items-center justify-center">{item.quantity}</div>
                                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"><button onClick={() => increaseQuantityHandler(item)}>+</button></div>
                            </div>
                        </div>
                        <div className="text-primary text-lg font-semibold">${item.price}</div>
                        <div className="text-primary text-lg font-semibold">${item.price * item.quantity}</div>
                        <div className="text-gray-600 cursor-pointer hover:text-primary" onClick={() => handleRemoveItem(item.id)}>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                ))}

                <div className="col-span-4 border border-gray-200 p-4 rounded">
                    <h2 className="text-3xl font-medium uppercase mb-2">Check Out</h2>
                    <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border border-gray-300 w-40 font-medium text-center">#</th>
                                <th className="py-2 px-4 border border-gray-300 ">Name</th>
                                <th className="py-2 px-4 border border-gray-300 text-center">Qantity</th>
                                <th className="py-2 px-4 border border-gray-300 text-center">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item: any, index: any) => (
                                <tr key={item.id}>
                                    <td className="py-2 px-4 border border-gray-300 w-40 font-medium text-center">{index + 1}</td>
                                    <td className="py-2 px-4 border border-gray-300 ">{item.title}</td>
                                    <td className="py-2 px-4 border border-gray-300 text-center">x{item.quantity}</td>
                                    <td className="py-2 px-4 border border-gray-300 text-center">${item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>subtotal</p>
                        <p>${total}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>shipping</p>
                        <p>${shippingCharge}</p>
                    </div>

                    <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
                        <p className="font-semibold">Total</p>
                        <p>${cartTotal}</p>
                    </div>

                    <div className="flex items-center mb-4 mt-2">
                        <input type="checkbox" name="aggrement" id="aggrement"
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3" />
                        <label htmlFor="aggrement" className="text-gray-600 ml-3 cursor-pointer text-sm">I agree to the
                        <Link to="#" className="text-primary">terms & conditions</Link></label>
                    </div>

                    <Link to="#"
                        className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">Place
                        order</Link>
                </div>


            </div>




        </>
    );
}

export default ShoppingCart;