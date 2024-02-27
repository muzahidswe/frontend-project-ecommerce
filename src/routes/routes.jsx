import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProductDetailsPage from "../pages/ProductPage/ProductDetailsPage";
import UserAccountPage from "../pages/UserAccountPage/UserAccountPage";
import WishListPage from "../pages/WishListPage/WishListPage";
import CartPage from "../pages/CartPage/CartPage";

const AppRoutes = () => {
    return (
        <>
         <Routes>
            <Route
               path="/"
               element={
                  <>
                     <HomePage/>
                  </>
               }
            />
            <Route
               path="/products"
               element={
                  <>
                     {/* <Header />
                     <ProductPage />
                     <Footer /> */}
                      <ProductPage/>
                  </>
               }
            />
            {/* 
            <Route
               path="/cart"
               element={
                  <PrivateRoute>
                     <Header />
                     <Cart />
                     <Footer />
                  </PrivateRoute>
               }
            />*/}
            <Route
               path="/products/:productId"
               element={
                  <>
                     <ProductDetailsPage />
                  </>
               }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/user-account" element={<UserAccountPage />} />
            <Route path="/wishlist" element={<WishListPage />} />
            <Route path="/shopping-cart" element={<CartPage />} />
            {/* <Route
               path="*"
               element={
                  <>
                     <Header />
                     <Error />
                  </>
               }
            />  */}
         </Routes>
        </>
    );
};

export default AppRoutes;