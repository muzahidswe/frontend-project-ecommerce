import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const storedUser = localStorage.getItem('userInformation');
    return (
        <>
            {/* start navbar */}
            <nav className="bg-gray-800">
                <div className="container flex">
                    <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
                        <span className="text-white">
                            <i className="fa-solid fa-bars"></i>
                        </span>
                        {/* <span className="capitalize ml-2 text-white hidden">All Categories</span>
                        <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
                            <Link to="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src={sofa} alt="sofa" className="w-5 h-5 object-contain" />
                                <span className="ml-6 text-gray-600 text-sm">Sofa</span>
                            </Link>
                            <Link to="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src={terrace} alt="terrace" className="w-5 h-5 object-contain" />
                                <span className="ml-6 text-gray-600 text-sm">Terarce</span>
                            </Link>
                            <Link to="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src={bed} alt="bed" className="w-5 h-5 object-contain" />
                                <span className="ml-6 text-gray-600 text-sm">Bed</span>
                            </Link>
                            <Link to="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src={office} alt="office" className="w-5 h-5 object-contain" />
                                <span className="ml-6 text-gray-600 text-sm">office</span>
                            </Link>
                            <Link to="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src={outdoorCafe} alt="outdoor" className="w-5 h-5 object-contain" />
                                <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
                            </Link>
                            <Link to="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src={bed2} alt="Mattress" className="w-5 h-5 object-contain" />
                                <span className="ml-6 text-gray-600 text-sm">Mattress</span>
                            </Link>
                        </div> */}
                    </div>

                    <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
                        <div className="flex items-center space-x-6 capitalize">
                            <Link to="/" className="text-gray-200 hover:text-white transition">Home</Link>
                            <Link to="/products" className="text-gray-200 hover:text-white transition">All Products</Link>
                            <Link to="#" className="text-gray-200 hover:text-white transition">About us</Link>
                            <Link to="#" className="text-gray-200 hover:text-white transition">Contact us</Link>
                        </div>
                        <div className="flex items-center space-x-6 capitalize">
                            {storedUser == null ? (
                                <>
                                    <Link to="/login" className="text-gray-200 hover:text-white transition"><i className="fa-solid fa-right-from-bracket"></i> Login</Link>
                                    <Link to="/signup" className="text-gray-200 hover:text-white transition"><i className="fa-solid fa-user-plus"></i> SignUp</Link>

                                </>
                            ) : (
                                <>
                                    <Link to="#" className="text-gray-200 hover:text-white transition"><i className="fa-solid fa-plus"></i> Add Product</Link>
                                    <Link to="/logout" className="text-gray-200 hover:text-white transition"><i className="fa-solid fa-right-from-bracket"></i> Logout</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {/* end navbar */}
        </>
    );
}

export default Navbar;