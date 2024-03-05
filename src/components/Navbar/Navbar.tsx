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
                    </div>

                    <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
                        <div className="flex items-center space-x-6 capitalize">
                            <Link to="/" className="text-gray-200 hover:text-white transition">Home</Link>
                            <Link to="/products" className="text-gray-200 hover:text-white transition">All Products</Link>
                            <Link to="#" className="text-gray-200 hover:text-white transition">About us</Link>
                            <Link to="#" className="text-gray-200 hover:text-white transition">Contact us</Link>
                        </div>
                        <div className="flex items-center space-x-6 capitalize">
                            {storedUser != null ? (
                                <>
                                    <Link to="#" className="text-gray-200 hover:text-white transition"><i className="fa-solid fa-plus"></i> Add Product</Link>
                                    <Link to="/logout" className="text-gray-200 hover:text-white transition"><i className="fa-solid fa-right-from-bracket"></i> Logout</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-200 hover:text-white transition"><i className="fa-solid fa-right-from-bracket"></i> Login</Link>
                                    <Link to="/signup" className="text-gray-200 hover:text-white transition"><i className="fa-solid fa-user-plus"></i> SignUp</Link>
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