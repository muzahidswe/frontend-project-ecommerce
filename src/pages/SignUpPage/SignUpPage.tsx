import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from "react-redux";

import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { UserRegister } from "../../misc/type";
import { API_BASE_URL, useGoogleLoginWrapper } from '../../utils/apiUtils';
import { saveUserInformation } from '../../redux/slices/userSlice';

const SignUpPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userInformation, setUserInformation] = useState<UserRegister>({
        name: "",
        email: "",
        password: "",
        avatar: "",
    });

    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setUserInformation({
            ...userInformation,
            [event.target.name]: event.target.value,
        });
    }

    function onClickHandler(event: any) {
        event.preventDefault();
        // send user information to API
        axios
            .post(`${API_BASE_URL}users/`, userInformation)
            .then((response) => {
                if (response.status === 201) {
                    // return user data
                    // save information to redux
                    dispatch(saveUserInformation(response.data));
                    localStorage.setItem('userInformation', JSON.stringify({name: userInformation.name, email: userInformation.email, picture: userInformation.avatar}));
                    // navigate user to log in
                    navigate("/user-account");
                }
            })
            .catch((error) => console.log(error));
    }

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
                <p className="text-gray-600 font-medium">Sign Up</p>
            </div>
            {/* end breadcrumb */}
            {/* Start Register Form */}
            <div className="contain py-16">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                    <h2 className="text-2xl uppercase font-medium mb-1">Create an account</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Register for new cosutumer
                    </p>
                    {/* <form action="javascript:void(0);" method="post" autoComplete="off"> */}
                    <form onSubmit={onClickHandler} autoComplete="off">
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="name" className="text-gray-600 mb-2 block">Full Name</label>
                                <input type="text" name="name" id="name" onChange={onChangeHandler} value={userInformation.name}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="fulan fulana" />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-gray-600 mb-2 block">Email address</label>
                                <input type="email" name="email" id="email" onChange={onChangeHandler} value={userInformation.email}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="youremail.@domain.com" />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
                                <input type="password" name="password" id="password" onChange={onChangeHandler} value={userInformation.password}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="*******" />
                            </div>
                            <div>
                                <label htmlFor="avatar" className="text-gray-600 mb-2 block">Avatar</label>
                                <input type="text" name="avatar" id="avatar" onChange={onChangeHandler} value={userInformation.avatar}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="Avatar" />
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
            {/* End Register Form */}
            <Footer />
        </>
    )
}

export default SignUpPage;