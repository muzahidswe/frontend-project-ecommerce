import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link, useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
                .then((res) => res.json())
                .then((data) => setProducts(data))
        }
        fetchProducts();
    }, [productId]);

    const defaultImg = 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png';
    const handleImageError = (event) => {
        // Set a default image if the original image fails to load
        event.target.src = defaultImg
    };
    return (
        <>
            <Header />
            <Navbar />
            {/* start breadcrumb */}
            <div class="container py-4 flex items-center gap-3">
                <Link to="/" className="text-primary">
                    <i class="fa-solid fa-house"></i>
                </Link>
                <span class="text-sm text-gray-400">
                    <i class="fa-solid fa-chevron-right"></i>
                </span>
                <p class="text-gray-600 font-medium">Product Details</p>
            </div>
            {/* end breadcrumb */}

            {/* product-detail */}
            <div class="container grid grid-cols-2 gap-6">
                <div>
                    <img src={products.images ? products.images[0] : defaultImg} alt="product" class="w-full" onError={handleImageError}/>
                    <div class="grid grid-cols-5 gap-4 mt-4">
                        <img src={products.images ? products.images[1] : defaultImg} alt="product2" class="w-full cursor-pointer border border-primary" onError={handleImageError}/>
                        <img src={products.images ? products.images[2] : defaultImg} alt="product2" class="w-full cursor-pointer border" onError={handleImageError}/>
                        <img src={products.images ? products.images[0] : defaultImg} alt="product2" class="w-full cursor-pointer border" onError={handleImageError}/>
                        <img src={products.images ? products.images[1] : defaultImg} alt="product2" class="w-full cursor-pointer border" onError={handleImageError}/>
                        <img src={products.images ? products.images[2] : defaultImg} alt="product2" class="w-full cursor-pointer border" onError={handleImageError}/>
                    </div> 
                </div>
                <div>
                    <h2 class="text-3xl font-medium uppercase mb-2">{products.title}</h2>
                    <div class="flex items-center mb-4">
                        <div class="flex gap-1 text-sm text-yellow-400">
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                        </div>
                        <div class="text-xs text-gray-500 ml-3">(150 Reviews)</div>
                    </div>
                    <div class="space-y-2">
                        <p class="text-gray-800 font-semibold space-x-2">
                            <span>Availability: </span>
                            <span class="text-green-600">In Stock</span>
                        </p>
                        <p class="space-x-2">
                            <span class="text-gray-800 font-semibold">Brand: </span>
                            <span class="text-gray-600">Apex</span>
                        </p>
                        <p class="space-x-2">
                            <span class="text-gray-800 font-semibold">Category: </span>
                            <span class="text-gray-600">{products.title}</span>
                        </p>
                        <p class="space-x-2">
                            <span class="text-gray-800 font-semibold">SKU: </span>
                            <span class="text-gray-600">BE45VGRT</span>
                        </p>
                    </div>
                    <div class="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                        <p class="text-xl text-primary font-semibold">${products.price}</p>
                        <p class="text-base text-gray-400 line-through">${Math.floor((products.price) * 1.15)}</p>
                    </div>
                    <p className="mt-4 text-gray-600 text-justify" >{products.description}
                    </p>
                    <div class="pt-4">
                        <h3 class="text-sm text-gray-800 uppercase mb-1">Size</h3>
                        <div class="flex items-center gap-2">
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-xs" class="hidden" />
                                <label for="size-xs"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">XS</label>
                            </div>
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-sm" class="hidden" />
                                <label for="size-sm"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">S</label>
                            </div>
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-m" class="hidden" />
                                <label for="size-m"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">M</label>
                            </div>
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-l" class="hidden" />
                                <label for="size-l"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">L</label>
                            </div>
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-xl" class="hidden" />
                                <label for="size-xl"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">XL</label>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h3 class="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
                        <div class="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                            <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">-</div>
                            <div class="h-8 w-8 text-base flex items-center justify-center">4</div>
                            <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">+</div>
                        </div>
                    </div>
                    <div class="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                        <Link to="/" 
                            class="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                            <i class="fa-solid fa-bag-shopping"></i> Add to cart
                        </Link>
                        <Link to="/" 
                            class="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition">
                            <i class="fa-solid fa-heart"></i> Wishlist
                        </Link>
                    </div>
                    <div class="flex gap-3 mt-4">
                        <Link to="/" 
                            class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                            <i class="fa-brands fa-facebook-f"></i>
                        </Link>
                        <Link to="/" 
                            class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                            <i class="fa-brands fa-twitter"></i>
                        </Link>
                        <Link to="/" 
                            class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                            <i class="fa-brands fa-instagram"></i>
                        </Link>
                    </div>
                </div>
            </div>
            {/* product-detail */}
            <Footer />
        </>
    )
}

export default ProductDetailsPage;