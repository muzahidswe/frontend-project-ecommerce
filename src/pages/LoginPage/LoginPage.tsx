import React from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from 'react-router-dom';
import {useGoogleLoginWrapper} from '../../utils/apiUtils';

const LoginPage = () => {
    const googleLogin = useGoogleLoginWrapper();
    const handleGoogleLogin = async () => {
        await googleLogin();
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
                <p className="text-gray-600 font-medium">Login</p>
            </div>
            {/* end breadcrumb */}
            {/* Start Login Form */}
            <div className="contain py-16">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                    <h2 className="text-2xl uppercase font-medium mb-1 text-center">Login to your  account</h2>
                    
                    <form action="#" method="post" autoComplete="off">
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="email" className="text-gray-600 mb-2 block">Email address</label>
                                <input type="email" name="email" id="email"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="youremail.@domain.com" />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
                                <input type="password" name="password" id="password"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="*******" />
                            </div>
                            
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center">
                                <input type="checkbox" name="aggrement" id="aggrement"
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                                <label htmlFor="aggrement" className="text-gray-600 ml-3 cursor-pointer">I have read and agree to the
                                    <Link to="#" className="text-primary">Terms & Conditions</Link>
                                </label>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button type="submit"
                                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">create
                                account</button>
                        </div>
                    </form>


                    <div className="mt-6 flex justify-center relative">
                        <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">Or signup with</div>
                        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
                    </div>

                    <div className="mt-4 flex gap-4">
                        <Link to="#" className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</Link>
                        <button className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500" onClick={() => handleGoogleLogin()}>google</button>
                    </div>

                    <p className="mt-4 text-center text-gray-600">Already have account?
                        <Link to="/login" className="text-primary"> Login now</Link>
                    </p>
                </div>
            </div>
            {/* End Login Form */}
            <Footer />
        </>
    )
}

export default LoginPage;