import { Link } from 'react-router-dom';

import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import UserAccountSidebar from '../../components/UserAccountSidebar/UserAccountSidebar';
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';

const CartPage = () => {
    const storedUser = localStorage.getItem('userInformation');
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

                {(storedUser) ? (<>
                    <UserAccountSidebar />
                </>) : (<></>)}

                {/* wishlist */}
                <ShoppingCart />
                {/* wishlist */}
            </div>
            {/* account wrapper */}

            <Footer />
        </>
    )
}

export default CartPage;