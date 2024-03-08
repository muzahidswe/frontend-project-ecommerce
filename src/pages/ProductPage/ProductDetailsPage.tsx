import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Product } from "../../misc/type";
import { AppState, useAppDispatch } from "../../redux/store/store";
import { addToCart } from "../../redux/slices/cartSlice";
import { fetchSingleProduct } from '../../redux/slices/productSlice';

const ProductDetailsPage = () => {
    const dispatch = useAppDispatch();
    const { productId } = useParams();

    const [products, setProducts] = useState<Product>({ id: 0, title: '', price: 0, description: '', images: [], category: {id: 0, name: '', image: ''} });

    const cart = useSelector((state: AppState) => state.carts.carts);
    // const products = useSelector((state: AppState) => state.products.products);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // await dispatch(fetchSingleProduct(productId!));
                const productData = await dispatch(fetchSingleProduct(productId!));
                setProducts(productData.payload);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchProducts(); // Call the async function immediately
    }, [dispatch, productId]);

    function addToCartHandler(product: Product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            toast.error('Item Added Already!', { position: 'top-right' });
        } else {
            const productCart = { ...product, quantity: 1 };
            dispatch(addToCart(productCart));
        }
    }

    const defaultImg = 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png';
    const handleImageError = (event: any) => {
        // Set a default image if the original image fails to load
        event.target.src = defaultImg
    };

    return (
        <>
            <Header />
            <Navbar />
            {/* start breadcrumb */}
            <div className="container py-4 flex items-center gap-3">
                <Link to="/" className="text-primary">
                    <i className="fa-solid fa-house"></i>
                </Link>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
                <p className="text-gray-600 font-medium">Product Details</p>
            </div>
            {/* end breadcrumb */}
            <ToastContainer position="top-right" />
            {/* product-detail */}
            {products ? (
                <>
                    <div className="container grid grid-cols-2 gap-6">
                        <div>
                            {(products.images && products.images.length > 0) ? (
                                <>
                                    <img src={products.images ? (products.images[0] as string)?.replace(/[[\]"\s]/g, '') : defaultImg} alt="product" className="w-full" onError={handleImageError} />
                                    <div className="grid grid-cols-5 gap-4 mt-4">
                                        <img src={products.images ? (products.images[1] as string)?.replace(/[[\]"\s]/g, '') : defaultImg} alt="product2" className="w-full cursor-pointer border border-primary" onError={handleImageError} />
                                        <img src={products.images ? (products.images[2] as string)?.replace(/[[\]"\s]/g, '') : defaultImg} alt="product2" className="w-full cursor-pointer border" onError={handleImageError} />
                                        <img src={products.images ? (products.images[0] as string)?.replace(/[[\]"\s]/g, '') : defaultImg} alt="product2" className="w-full cursor-pointer border" onError={handleImageError} />
                                        <img src={products.images ? (products.images[1] as string)?.replace(/[[\]"\s]/g, '') : defaultImg} alt="product2" className="w-full cursor-pointer border" onError={handleImageError} />
                                        <img src={products.images ? (products.images[2] as string)?.replace(/[[\]"\s]/g, '') : defaultImg} alt="product2" className="w-full cursor-pointer border" onError={handleImageError} />
                                    </div>
                                </>
                            ) :
                                <></>}
                        </div>
                        <div>
                            <h2 className="text-3xl font-medium uppercase mb-2">{products.title}</h2>
                            <div className="flex items-center mb-4">
                                <div className="flex gap-1 text-sm text-yellow-400">
                                    <span><i className="fa-solid fa-star"></i></span>
                                    <span><i className="fa-solid fa-star"></i></span>
                                    <span><i className="fa-solid fa-star"></i></span>
                                    <span><i className="fa-solid fa-star"></i></span>
                                    <span><i className="fa-solid fa-star"></i></span>
                                </div>
                                <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-800 font-semibold space-x-2">
                                    <span>Availability: </span>
                                    <span className="text-green-600">In Stock</span>
                                </p>
                                <p className="space-x-2">
                                    <span className="text-gray-800 font-semibold">Brand: </span>
                                    <span className="text-gray-600">Apex</span>
                                </p>
                                <p className="space-x-2">
                                    <span className="text-gray-800 font-semibold">Category: </span>
                                    <span className="text-gray-600">{products.category.name}</span>
                                </p>
                                <p className="space-x-2">
                                    <span className="text-gray-800 font-semibold">SKU: </span>
                                    <span className="text-gray-600">BE45VGRT</span>
                                </p>
                            </div>
                            <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                                <p className="text-xl text-primary font-semibold">${products.price}</p>
                                <p className="text-base text-gray-400 line-through">${Math.floor((products.price) * 1.15)}</p>
                            </div>
                            <p className="mt-4 text-gray-600 text-justify" >{products.description} </p>
                            <div className="mt-4">
                                <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
                                <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                                    <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">-</div>
                                    <div className="h-8 w-8 text-base flex items-center justify-center">1</div>
                                    <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">+</div>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                                <button onClick={() => addToCartHandler(products)}
                                    className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transitionn">Add
                                    to cart
                                </button>
                                <Link to="/"
                                    className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition">
                                    <i className="fa-solid fa-heart"></i> Wishlist
                                </Link>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <Link to="/"
                                    className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </Link>
                                <Link to="/"
                                    className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                                    <i className="fa-brands fa-twitter"></i>
                                </Link>
                                <Link to="/"
                                    className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                                    <i className="fa-brands fa-instagram"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                </>
            )}

            {/* product-detail */}
            <Footer />
        </>
    )
}

export default ProductDetailsPage;