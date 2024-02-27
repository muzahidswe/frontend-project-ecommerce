import React from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from 'react-router-dom';
import UserAccountSidebar from '../../components/UserAccountSidebar/UserAccountSidebar';

const CartPage = () => {
    const defaultImg = 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png';
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
                <p className="text-gray-600 font-medium">Shopping Cart</p>
            </div>
            {/* end breadcrumb */}

            {/* account wrapper */}
            <div className="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
                <UserAccountSidebar/>

                {/* wishlist */}
                <div class="col-span-9 space-y-4">
                    <h2 className="text-3xl font-medium uppercase mb-2">Shopping Cart</h2>
                    <div class="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                        <div class="w-28">
                            <img src={defaultImg} alt="product 6" class="w-full" />
                        </div>
                        <div class="w-1/3">
                            <h2 class="text-gray-800 text-xl font-medium uppercase">Italian L shape</h2>
                            <p class="text-gray-500 text-sm">Availability: <span class="text-green-600">In Stock</span></p>
                        </div>
                        <div class="mt-4">
                        
                        <div class="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max" style={{margin: '-25% 0%'}}>
                            <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">-</div>
                            <div class="h-8 w-8 text-base flex items-center justify-center">4</div>
                            <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">+</div>
                        </div>
                    </div>
                        <div class="text-primary text-lg font-semibold">$320.00</div>
                        <div class="text-primary text-lg font-semibold">$320.00</div>
                        

                        <div class="text-gray-600 cursor-pointer hover:text-primary">
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
                {/* wishlist */}
            </div>
            {/* account wrapper */}

            <Footer />
        </>
    )
}

export default CartPage;