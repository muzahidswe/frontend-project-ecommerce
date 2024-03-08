import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { logedUserInfo } from "../../misc/type";
import { DEFAULT_IMAGE_URL } from '../../utils/apiUtils';

const UserAccountSidebar = () => {
    const [userInfo, setUser] = useState<logedUserInfo>({ email: '', name: '', image: '' });

    const storedUser = localStorage.getItem('userInformation');

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
                        <Link to="#" className="relative text-primary block font-medium capitalize transition">
                            <span className="absolute -left-8 top-0 text-base">
                                <i className="fa-regular fa-address-card"></i>
                            </span>
                            Manage account
                        </Link>
                        <Link to="#" className="relative hover:text-primary block capitalize transition">
                            Profile information
                        </Link>
                        <Link to="#" className="relative hover:text-primary block capitalize transition">
                            Manage addresses
                        </Link>
                        <Link to="#" className="relative hover:text-primary block capitalize transition">
                            Change password
                        </Link>
                    </div>
                    <div className="space-y-1 pl-8 pt-4">
                        <Link to="#" className="relative hover:text-primary block font-medium capitalize transition">
                            <span className="absolute -left-8 top-0 text-base">
                                <i className="fa-solid fa-box-archive"></i>
                            </span>
                            My order history
                        </Link>
                        <Link to="#" className="relative hover:text-primary block capitalize transition">
                            My returns
                        </Link>
                        <Link to="#" className="relative hover:text-primary block capitalize transition">
                            My Cancellations
                        </Link>
                        <Link to="#" className="relative hover:text-primary block capitalize transition">
                            My reviews
                        </Link>
                    </div>
                    <div className="space-y-1 pl-8 pt-4">
                        <Link to="#" className="relative hover:text-primary block font-medium capitalize transition">
                            <span className="absolute -left-8 top-0 text-base">
                                <i className="fa-regular fa-credit-card"></i>
                            </span>
                            Payment methods
                        </Link>
                        <Link to="#" className="relative hover:text-primary block capitalize transition">
                            voucher
                        </Link>
                    </div>
                    <div className="space-y-1 pl-8 pt-4">
                        <Link to="/wishlist" className="relative hover:text-primary block font-medium capitalize transition">
                            <span className="absolute -left-8 top-0 text-base">
                                <i className="fa-regular fa-heart"></i>
                            </span>
                            My wishlist
                        </Link>
                    </div>
                    <div className="space-y-1 pl-8 pt-4">
                        <Link to="#" className="relative hover:text-primary block font-medium capitalize transition">
                            <span className="absolute -left-8 top-0 text-base">
                                <i className="fa-regular fa-arrow-right-from-bracket"></i>
                            </span>
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
            {/* sidebar */}
        </>
    )
};

export default UserAccountSidebar;