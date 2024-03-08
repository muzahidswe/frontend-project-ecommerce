import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { logedUserInfo } from "../../misc/type";
import { DEFAULT_IMAGE_URL } from '../../utils/apiUtils';
import { searchProductByName } from "../../redux/slices/productSlice";


const UserProductSidebar = () => {
    const [userInfo, setUser] = useState<logedUserInfo>({ email: '', name: '', image: '' });
    const [userInput, setUserInput] = useState("");

    const storedUser = localStorage.getItem('userInformation');

    const dispatch = useDispatch();
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {   
        setUserInput(event.target.value);
        dispatch(searchProductByName(event.target.value));
    }

    useEffect(() => {
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser({ email: parsedUser.email, name: parsedUser.name, image: parsedUser.avatar });
        }
    }, [storedUser]);

    const handleImageError = (event: any) => {
        // Set a default image if the original image fails to load
        event.target.src = DEFAULT_IMAGE_URL;
    };

    return (
        <>
            {/* sidebar */}
            <div className="col-span-3">
                <div className="px-4 py-3 shadow flex items-center gap-4">
                    <div className="flex-shrink-0">
                        <img src={userInfo.image} alt={userInfo ? userInfo.name : ''} onError={handleImageError}
                            className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover" />
                    </div>
                    <div className="flex-grow">
                        <p className="text-gray-600">Hello,</p>
                        <h4 className="text-gray-800 font-medium">{userInfo ? userInfo.name : ''}</h4>
                    </div>
                </div>
                <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
                    <div className="space-y-1 pl-8">
                        <Link to="/all-products" className="relative hover:text-primary block capitalize transition">
                            <span className="absolute -left-8 top-0 text-base">
                                <i className="fa-regular fa-address-card"></i>
                            </span>
                            All Product
                        </Link>
                        <Link to="/add-product" className="relative hover:text-primary block capitalize transition">
                        <span className="absolute -left-8 top-0 text-base">
                                <i className="fa-regular fa-plus"></i>
                            </span>
                            Add Product
                        </Link>
                        <Link to="#" className="relative hover:text-primary block capitalize transition">
                        <span className="absolute -left-8 top-0 text-base">
                                <i className="fa-regular fa-edit"></i>
                            </span>
                            Edit Product
                        </Link>
                    </div>
                </div>
                <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
                    <div className="divide-y divide-gray-200 space-y-5">
                        <div>
                            <h4 className=" text-gray-800 mb-3 uppercase font-medium">Search Product or Category</h4>
                            <div className="mt-4 flex items-center">
                                <input type="text" value={userInput} onChange={onChangeHandler}
                                    className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                                    placeholder="Type Here" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* sidebar */}
        </>
    )
};

export default UserProductSidebar;