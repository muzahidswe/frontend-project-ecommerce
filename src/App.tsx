import React from "react";
import {
   Footer,
   Header,
   PrivateRoute,
   CustomSnackbar,
} from "./components";
import {
   Cart,
   Home,
   Login,
   Products,
   SignUp,
   SingleProductPage,
   Error,
} from "./pages";
// import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

const App = () => {
  //  const { url } = useSelector((state) => state.cart);
   return (
      <>
         <CustomSnackbar />
         <Routes>
            <Route
               path="/"
               element={
                  <>
                     <Header />
                     <Home />
                  </>
               }
            />
            <Route
               path="/products"
               element={
                  <>
                     <Header />
                     <Products />
                     <Footer />
                  </>
               }
            />

            <Route
               path="/cart"
               element={
                  <PrivateRoute>
                     <Header />
                     <Cart />
                     <Footer />
                  </PrivateRoute>
               }
            />
            <Route
               path="/products/:id"
               element={
                  <>
                     <Header />
                     <SingleProductPage />
                     <Footer />
                  </>
               }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route
               path="*"
               element={
                  <>
                     <Header />
                     <Error />
                  </>
               }
            />
         </Routes>
      </>
   );
};

export default App;
