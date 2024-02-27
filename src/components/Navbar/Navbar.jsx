import React from "react";
import sofa from '../../assets/images/icons/sofa.svg';
import terrace from '../../assets/images/icons/terrace.svg';
import bed from '../../assets/images/icons/bed.svg';
import office from '../../assets/images/icons/office.svg';
import outdoorCafe from '../../assets/images/icons/outdoor-cafe.svg';
import bed2 from '../../assets/images/icons/bed-2.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            {/* start navbar */}
            <nav class="bg-gray-800">
                <div class="container flex">
                    <div class="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
                        <span class="text-white">
                            <i class="fa-solid fa-bars"></i>
                        </span>
                        <span class="capitalize ml-2 text-white hidden">All Categories</span>
                        <div class="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
                            <Link to="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src={sofa} alt="sofa" class="w-5 h-5 object-contain" />
                                <span class="ml-6 text-gray-600 text-sm">Sofa</span>
                            </Link>
                            <Link to="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src={terrace} alt="terrace" class="w-5 h-5 object-contain" />
                                <span class="ml-6 text-gray-600 text-sm">Terarce</span>
                            </Link>
                            <Link to="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src={bed} alt="bed" class="w-5 h-5 object-contain" />
                                <span class="ml-6 text-gray-600 text-sm">Bed</span>
                            </Link>
                            <Link to="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src={office} alt="office" class="w-5 h-5 object-contain" />
                                <span class="ml-6 text-gray-600 text-sm">office</span>
                            </Link>
                            <Link to="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src={outdoorCafe} alt="outdoor" class="w-5 h-5 object-contain" />
                                <span class="ml-6 text-gray-600 text-sm">Outdoor</span>
                            </Link>
                            <Link to="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src={bed2} alt="Mattress" class="w-5 h-5 object-contain" />
                                <span class="ml-6 text-gray-600 text-sm">Mattress</span>
                            </Link>
                        </div>
                    </div>

                    <div class="flex items-center justify-between flex-grow md:pl-12 py-5">
                        <div class="flex items-center space-x-6 capitalize">
                            <Link to="/" className="text-gray-200 hover:text-white transition">Home</Link>
                            <Link to="/products" className="text-gray-200 hover:text-white transition">All Products</Link>
                            <Link to="#" className="text-gray-200 hover:text-white transition">About us</Link>
                            <Link to="#" className="text-gray-200 hover:text-white transition">Contact us</Link>
                        </div>
                        <div class="flex items-center space-x-6 capitalize">
                            <Link to="/login" className="text-gray-200 hover:text-white transition">Login</Link>
                            <Link to="/signup" className="text-gray-200 hover:text-white transition">SignUp</Link>
                        </div>
                    </div>
                </div>
            </nav>
            {/* end navbar */}
        </>
    );
}

export default Navbar;