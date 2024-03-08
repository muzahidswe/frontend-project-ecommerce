import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import UserProductSidebar from "../../components/UserProductSidebar/UserProductSidebar";
import { AppState, useAppDispatch } from "../../redux/store/store";
import { fetchSingleProduct, submitEditProduct } from '../../redux/slices/productSlice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const EditProductPage = () => {
    const dispatch = useAppDispatch();
    const { productId } = useParams();

    const [products, setProducts] = useState({ title: '', price: '', images: [] });
    const [isFormValid, setIsFormValid] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        images: ['', '', ''],
    });

    const [errors, setErrors] = useState({
        title: '',
        price: '',
        image_1: '',
        image_2: '',
        image_3: '',
    });

    const loading = useSelector((state: AppState) => state.products.loading);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        let error = '';
        if (name === 'title' && !value.trim()) {
            error = 'Title is required';
        }
        if (name === 'price' && !value.trim()) {
            error = 'Price is required';
        }
        if (name === 'image_1' && !value.trim()) {
            error = 'Image 1 is required';
        }
        if (name === 'image_2' && !value.trim()) {
            error = 'Image 2 is required';
        }
        if (name === 'image_3' && !value.trim()) {
            error = 'Image 3 is required';
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

        const isCurrentFormValid = Object.values(errors).every((error) => !error);
        setIsFormValid(isCurrentFormValid);

        if (name.startsWith("image_")) {
            const imageIndex = parseInt(name.split("_")[1]) - 1;
            setFormData((prevData) => {
                const updatedImages = [...prevData.images];
                updatedImages[imageIndex] = value.trim();
                return {
                    ...prevData,
                    images: updatedImages,
                };
            });
        }
        else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value.trim(),
            }));
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        console.log('formData');
        console.log(formData);
        if (productId) {
            dispatch(submitEditProduct({ productId, formData }));
        } else {
            // Handle the case when productId is undefined
            console.error('productId is undefined');
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await dispatch(fetchSingleProduct(productId!));
                setProducts(productData.payload);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchProducts(); // Call the async function immediately
    }, [dispatch, productId]);

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
                <p className="text-gray-600 font-medium">Edit Product</p>
            </div>
            {/* end breadcrumb */}
            <ToastContainer position="top-right" />
            {/* account wrapper */}
            <div className="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
                {/* sidebar */}
                <UserProductSidebar />
                {/* sidebar */}

                {/* info */}
                <div className="col-span-9 grid grid-cols-3 gap-4" key={productId}>
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <div className="col-span-8 border border-gray-200 p-4 rounded">
                                <h3 className="text-lg font-medium capitalize mb-4">Product Information</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="title" className="text-gray-600">Title
                                                <span className="text-primary">*</span></label>
                                            <input type="text" name="title" id="title" defaultValue={products.title} className="input-box" onChange={handleInputChange} disabled={false} />
                                            {errors.title && <span className="text-red-500">{errors.title}</span>}
                                        </div>
                                        <div>
                                            <label htmlFor="price" className="text-gray-600">Price
                                                <span className="text-primary">*</span></label>
                                            <input type="text" name="price" id="price" defaultValue={products.price} className="input-box" onChange={handleInputChange} disabled={false} />
                                            {errors.price && <span className="text-red-500">{errors.price}</span>}
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            {products.images && products.images.length > 0 && products.images[0] &&
                                                <div>
                                                    <div>
                                                        <label htmlFor="image_1" className="text-gray-400">Image 1
                                                            <span className="text-primary">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="image_1"
                                                            id="image_1"
                                                            defaultValue={(products.images[0] as string)?.replace(/[[\]"\s]/g, '')}
                                                            className="input-box"
                                                            onChange={handleInputChange}
                                                            disabled={false}
                                                        />
                                                        {errors.image_1 && <span className="text-red-500">{errors.image_1}</span>}
                                                    </div>
                                                </div>
                                            }

                                            {products.images && products.images.length > 0 && products.images[1] &&
                                                <div>
                                                    <div>
                                                        <label htmlFor="image_2" className="text-gray-400">Image 2
                                                            <span className="text-primary">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="image_2"
                                                            id="image_2"
                                                            defaultValue={(products.images[1] as string)?.replace(/[[\]"\s]/g, '')}
                                                            className="input-box"
                                                            onChange={handleInputChange}
                                                            disabled={false}
                                                        />
                                                        {errors.image_2 && <span className="text-red-500">{errors.image_2}</span>}
                                                    </div>
                                                </div>
                                            }

                                            {products.images && products.images.length > 0 && products.images[2] &&
                                                <div>
                                                    <div>
                                                        <label htmlFor="image_3" className="text-gray-400">Image 3
                                                            <span className="text-primary">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="image_3"
                                                            id="image_3"
                                                            defaultValue={(products.images[2] as string)?.replace(/[[\]"\s]/g, '')}
                                                            className="input-box"
                                                            onChange={handleInputChange}
                                                            disabled={false}
                                                        />
                                                        {errors.image_3 && <span className="text-red-500">{errors.image_3}</span>}
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <button type="submit" disabled={!isFormValid}
                                            className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">Edit Product
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}
                </div>
                {/* info */}
            </div>
            {/* account wrapper */}
            <Footer />
        </>
    )
}

export default EditProductPage;