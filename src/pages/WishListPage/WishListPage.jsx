import React from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from 'react-router-dom';
import UserAccountSidebar from '../../components/UserAccountSidebar/UserAccountSidebar';

const WishListPage = () => {
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
                <p className="text-gray-600 font-medium">User Wistlist</p>
            </div>
            {/* end breadcrumb */}

            {/* account wrapper */}
            <div className="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
                <UserAccountSidebar/>
                {/* wishlist */}
                
                <div className="col-span-9 space-y-4">
                    <h2 className="text-3xl font-medium uppercase mb-2">User Wishlist</h2>
                    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                        <div className="w-28">
                            <img src={defaultImg} alt="product 6" className="w-full" />
                        </div>
                        <div className="w-1/3">
                            <h2 className="text-gray-800 text-xl font-medium uppercase">Italian L shape</h2>
                            <p className="text-gray-500 text-sm">Availability: <span className="text-green-600">In Stock</span></p>
                        </div>
                        <div className="text-primary text-lg font-semibold">$320.00</div>
                        <Link to="/"
                            className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">add
                            to cart</Link>
                        <div className="text-gray-600 cursor-pointer hover:text-primary">
                            <i className="fa-solid fa-trash"></i>
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

export default WishListPage;