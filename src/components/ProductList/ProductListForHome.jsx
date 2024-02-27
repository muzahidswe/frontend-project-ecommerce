import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ProductListForHome = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=12")
                .then((res) => res.json())
                .then((data) => setProducts(data))
        }
        fetchProducts();
    }, []);

    const handleImageError = (event) => {
        // Set a default image if the original image fails to load
        event.target.src = 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png';
    };

    return (
        <>
            <div class="container pb-16">
                <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">Recomended for you</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((item, index) => (
                        <div class="bg-white shadow rounded overflow-hidden group">
                            <div class="relative">
                                <img src={item.images[0]} alt={item.title} class="w-full" onError={handleImageError}/>
                                <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <Link to = {`/products/${item.id}`}
                                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                        title="view product">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </Link>
                                    <Link to="#"
                                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                        title="add to wishlist">
                                        <i class="fa-solid fa-heart"></i>
                                    </Link>
                                </div>
                            </div>
                            <div class="pt-4 pb-3 px-4">
                                <Link to="#">
                                    <h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
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
                                <div class="flex items-baseline mb-1 space-x-2">
                                    <p class="text-xl text-primary font-semibold">${item.price}</p>
                                    <p class="text-sm text-gray-400 line-through">${Math.floor((item.price) * 1.15)}</p>
                                </div>
                                <div class="flex items-center">
                                    <div class="flex gap-1 text-sm text-yellow-400">
                                        <span><i class="fa-solid fa-star"></i></span>
                                        <span><i class="fa-solid fa-star"></i></span>
                                        <span><i class="fa-solid fa-star"></i></span>
                                        <span><i class="fa-solid fa-star"></i></span>
                                        <span><i class="fa-solid fa-star"></i></span>
                                    </div>
                                    <div class="text-xs text-gray-500 ml-3">(150)</div>
                                </div>
                            </div>
                            <Link to="#" className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Add to cart</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProductListForHome;