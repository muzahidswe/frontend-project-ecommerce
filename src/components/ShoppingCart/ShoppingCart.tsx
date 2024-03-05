import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppState, useAppDispatch } from "../../redux/store/store";
import { ProductCart } from "../../misc/type";
import { DEFAULT_IMAGE_URL } from '../../utils/apiUtils';
import { increaseQuantity, decreaseQuantity, removeItem } from "../../redux/slices/cartSlice";

const ShoppingCart = () => {
    const dispatch = useAppDispatch();
    const cartItems = useSelector((state: AppState) => state.carts.carts);
 
    const handleImageError = (event: any) => {
        // Set a default image if the original image fails to load
        event.target.src = DEFAULT_IMAGE_URL;
    };

    function increaseQuantityHandler(item: ProductCart) {
        dispatch(increaseQuantity(item));
    }

    function decreaseQuantityHandler(item: ProductCart) {
        if(item.quantity === 1){
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
            </div>
        </>
    );
}

export default ShoppingCart;