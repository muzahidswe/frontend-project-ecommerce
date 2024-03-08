import "../../App.css"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppState } from "../../redux/store/store";
import { useTheme } from "../contextAPI/ThemeContext";

import logo from '../../assets/images/integrify_logo.png';


const Header = () => {
    const storedUser = localStorage.getItem('userInformation');
    const userInformation = storedUser !== undefined && storedUser !== null ? JSON.parse(storedUser) : {};
  
    const cartItemsList = useSelector((state: AppState) => state.carts.carts);
    const { toggleTheme, theme } = useTheme();

    return (
        <>
            <header className="py-4 shadow-sm bg-white">
                <div className="container flex items-center justify-between">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="w-32" />
                    </Link>
                    <div className="w-full max-w-xl relative flex">
                        <span className="absolute left-4 top-3 text-lg text-gray-400">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input type="text" name="search" id="search"
                            className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
                            placeholder="search" />
                        <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex" style={{ paddingTop: '2%' }}>Search</button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/shopping-cart" className="text-center text-gray-700 hover:text-primary transition relative">
                            <div className="text-2xl">
                                <i className="fa-solid fa-bag-shopping"></i>
                            </div>
                            <div className="text-xs leading-3">Cart</div>
                            {cartItemsList.length > 0 ? (<>
                                <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                                    {cartItemsList.length}</div>
                            </>) : (
                                <>
                                </>
                            )}

                        </Link>
                        {(userInformation && Object.keys(userInformation).length > 0) ? (
                            <>
                                <Link to="/user-account" className="text-center text-gray-700 hover:text-primary transition relative">
                                    <div className="text-2xl">
                                        <i className="fa-regular fa-user"></i>
                                    </div>
                                    <div className="text-xs leading-3">Account</div>
                                </Link>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-4"  style={{
                        backgroundColor: theme === "light" ? "white" : "black",
                        color: theme === "light" ? "black" : "white",
                    }}>
                        <i>
                        <p> Theme: {theme}</p>
                        <button onClick={toggleTheme}><b>(Change)</b></button>
                        </i>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;