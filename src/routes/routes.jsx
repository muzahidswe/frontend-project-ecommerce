import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import LogoutPage from "../pages/Logout/LogoutPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProductDetailsPage from "../pages/ProductPage/ProductDetailsPage";
import UserAccountPage from "../pages/UserAccountPage/UserAccountPage";
import WishListPage from "../pages/WishListPage/WishListPage";
import CartPage from "../pages/CartPage/CartPage";

const AppRoutes = () => {
   const storedUser = localStorage.getItem('userInformation');

   return (
      <>
         <Routes>
            <Route path="/" element={<> <HomePage /> </>} />
            <Route path="/home" element={<> <HomePage /> </>} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:productId" element={<> <ProductDetailsPage /> </>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            {/* <Route path="/user-account" element={<UserAccountPage />} /> */}
            <Route
               path="/user-account"
               element={
                  <>
                     {(storedUser != null ? <UserAccountPage /> : <Navigate to="/login" />)}
                  </>
               }
            />
            <Route path="/wishlist" element={<WishListPage />} />
            <Route path="/shopping-cart" element={<CartPage />} />
         </Routes>
      </>
   );
};

export default AppRoutes;
