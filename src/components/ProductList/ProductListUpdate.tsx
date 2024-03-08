import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProductPagination from "../../pages/ProductPage/ProductPagination";
import { DEFAULT_IMAGE_URL } from '../../utils/apiUtils';
import { AppState, useAppDispatch } from "../../redux/store/store";
import { fetchAllProductsAsync, deleteProduct } from '../../redux/slices/productSlice';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const ProductListUpdate = () => {
    const dispatch = useAppDispatch();
    const productList = useSelector((state: AppState) => state.products.products);
    const loading = useSelector((state: AppState) => state.products.loading);
    const error = useSelector((state: AppState) => state.products.error);

    if (error) {
        toast.error('Failed to fetch products!', { position: 'top-right' });
    }

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchAllProductsAsync({
                    limit: rowsPerPage,
                    offset: (page - 1) * rowsPerPage,
                }));
            } catch (error) {
                alert('Error Fetching Data:');
                console.log(error);
                console.error('Error Fetching Data:', error);
            }
        };
        fetchData(); // Call the async function immediately
    }, [dispatch, page, rowsPerPage]);


    const handleImageError = (event: any) => {
        // Set a default image if the original image fails to load
        event.target.src = DEFAULT_IMAGE_URL;
    };

    const handleRemoveItem = (productId: any) => {
        dispatch(deleteProduct(productId));
        toast.success('Product Deleted successfully!', { position: 'top-right' });
    };

    return (
        <>
            <div>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <ToastContainer position="top-right" />
                        <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                            {productList.length > 0 && productList.map((item, index) => (
                                <div key={item.id} className="bg-white shadow rounded overflow-hidden group">
                                    <div className="relative">
                                        <img src={(item.images[0] as string)?.replace(/[[\]"\s]/g, '')} alt={item.title} className="w-full" onError={handleImageError} />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                            <Link to={`/products/${item.id}`}
                                                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                                title="view product">
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                            </Link>
                                            <Link to={`/edit-product/${item.id}`}
                                                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                                title="add to wishlist">
                                                <i className="fa-solid fa-edit"></i>
                                            </Link>
                                            <button onClick={() => handleRemoveItem(item.id)}
                                                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                                title="add to wishlist">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                            {/* Button to trigger delete action directly */}
                                            
                                        </div>
                                    </div>
                                    <div className="pt-4 pb-3 px-4">
                                        <Link to="#">
                                            <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                                                {
                                                    item.title.length > 20
                                                        ? (item.title).substr(0, 20)
                                                        : item.title
                                                }
                                            </h4>
                                        </Link>
                                        <p className="text-justify">
                                            {
                                                item.description.length > 40
                                                    ? (item.description).substr(0, 40)
                                                    : (
                                                        item.description.length < 30
                                                            ? 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                                                            : (item.description).substr(0, 40)
                                                    )
                                            }
                                        </p>
                                        <div className="flex items-baseline mb-1 space-x-2">
                                            <p className="text-xl font-semibold">{item.category.name}</p>
                                            <p className="text-xl text-primary font-semibold">${item.price}</p>
                                            <p className="text-sm text-gray-400 line-through">${Math.floor((item.price) * 1.15)}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex gap-1 text-sm text-yellow-400">
                                                <span><i className="fa-solid fa-star"></i></span>
                                                <span><i className="fa-solid fa-star"></i></span>
                                                <span><i className="fa-solid fa-star"></i></span>
                                                <span><i className="fa-solid fa-star"></i></span>
                                                <span><i className="fa-solid fa-star"></i></span>
                                            </div>
                                            <div className="text-xs text-gray-500 ml-3">(150)</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ProductPagination
                            count={productList.length}
                            page={page}
                            setPage={setPage}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                        />
                    </>
                )}
            </div>
        </>
    );
}
export default ProductListUpdate;