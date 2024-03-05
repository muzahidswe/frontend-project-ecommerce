import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import CategoryPage from "../CategoryPage/CategoryPage";
import Offer from "../../components/Offer/Offer";
import ProductListForHome from "../../components/ProductList/ProductListForHome";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
    return (
        <>
            <Header/>
            <Navbar/>
            <Banner/>
            <CategoryPage/>
            <Offer/>
            <ProductListForHome/>
            <Footer/>
        </>
    );
}

export default HomePage;