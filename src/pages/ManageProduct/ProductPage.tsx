import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductListUpdate from "../../components/ProductList/ProductListUpdate";
import UserProductSidebar from "../../components/UserProductSidebar/UserProductSidebar";
import { searchProductByName, sortProducts } from "../../redux/slices/productSlice";

const ProductPage = () => {
    const [sortedOption, setSortedOption] = useState('default');

    const dispatch = useDispatch();

    const handleSortChange = (event: any) => {
        const selectedOption = event.target.value;
        setSortedOption(selectedOption);
        dispatch(sortProducts(selectedOption));
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
                <p className="text-gray-600 font-medium">All Products</p>
            </div>
            {/* end breadcrumb */}
            {/* shop wrapper */}
            <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
                {/* sidebar */}
                {/* drawer init and toggle */}
                <div className="text-center md:hidden" >
                    <button
                        className="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block md:hidden"
                        type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example"
                        aria-controls="drawer-example">
                        {/* <ion-icon name="grid-outline"></ion-icon> */}
                    </button>
                </div>

                {/* drawer component */}

                {/* sidebar */}
                <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
                    <UserProductSidebar/>
                </div>
                {/* products */}
                <div className="col-span-3">
                    <div className="flex items-center mb-4">
                        <select name="sort" id="sort"
                            value={sortedOption}
                            onChange={handleSortChange}
                            className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
                            <option value="">Default sorting</option>
                            <option value="price-low-to-high">Price low to high</option>
                            <option value="price-high-to-low">Price high to low</option>
                        </select>

                        <div className="flex gap-2 ml-auto">
                            <div
                                className="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                                <i className="fa-solid fa-grip-vertical"></i>
                            </div>
                            <div
                                className="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer">
                                <i className="fa-solid fa-list"></i>
                            </div>
                        </div>
                    </div>
                    <ProductListUpdate />
                </div>
                {/* products */}
            </div>
            {/* shop wrapper */}
            <Footer />
        </>
    );
}

export default ProductPage;