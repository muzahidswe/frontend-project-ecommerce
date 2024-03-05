import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { DEFAULT_IMAGE_URL } from '../../utils/apiUtils';
import { AppState, useAppDispatch } from "../../redux/store/store";
import { fetchAllProductsAsync } from '../../redux/slices/productSlice';
import { addToCart } from "../../redux/slices/cartSlice";
import { Product } from "../../misc/type";

const ProductListForHome = () => {
    const dispatch = useAppDispatch();
    function addToCartHandler(product: Product) {
        const productCart = { ...product, quantity: 1 };
        dispatch(addToCart(productCart));
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchAllProductsAsync({ offset: 0, limit: 8 }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData(); // Call the async function immediately
    }, [dispatch]);

    const productList = useSelector((state: AppState) => state.products.products);

    const handleImageError = (event: any) => {
        // Set a default image if the original image fails to load
        event.target.src = DEFAULT_IMAGE_URL;
    };

    return (
        <>
            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">Recomended for you</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {productList.map((item, index) => (
                        <div key={item.id} className="bg-white shadow rounded overflow-hidden group">
                            <div className="relative">
                                <img src={item.images[0]} alt={item.title} className="w-full" onError={handleImageError}/>
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <Link to = {`/products/${item.id}`}
                                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                        title="view product">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </Link>
                                    <Link to="#"
                                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                        title="add to wishlist">
                                        <i className="fa-solid fa-heart"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="pt-4 pb-3 px-4">
                                <Link to="#">
                                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                                        {
                                            item.title.length > 20
                                                ? (item.title).substr(0, 20)
                                                : item.title
                                        }
                                    </h4>
                                </Link>
                                <p className="text-justify">
                                    {
                                        item.description.length > 40
                                            ? (item.description).substr(0, 40)
                                            : (
                                                item.description.length < 30
                                                    ? 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                                                    : (item.description).substr(0, 40)
                                            )
                                    }
                                </p>
                                <div className="flex items-baseline mb-1 space-x-2">
                                    <p className="text-xl text-primary font-semibold">${item.price}</p>
                                    <p className="text-sm text-gray-400 line-through">${Math.floor((item.price) * 1.15)}</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex gap-1 text-sm text-yellow-400">
                                        <span><i className="fa-solid fa-star"></i></span>
                                        <span><i className="fa-solid fa-star"></i></span>
                                        <span><i className="fa-solid fa-star"></i></span>
                                        <span><i className="fa-solid fa-star"></i></span>
                                        <span><i className="fa-solid fa-star"></i></span>
                                    </div>
                                    <div className="text-xs text-gray-500 ml-3">(150)</div>
                                </div>
                            </div>
                            <button onClick={() => addToCartHandler(item)} className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Add to cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProductListForHome;