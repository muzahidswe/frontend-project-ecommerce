import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import UserProductSidebar from "../../components/UserProductSidebar/UserProductSidebar";
import { AppState, useAppDispatch } from "../../redux/store/store";
import { submitAddProduct } from '../../redux/slices/productSlice';
import { fetchAllProductCategoryAsync } from '../../redux/slices/categorySlice';

const AddProductPage = () => {
    const dispatch = useAppDispatch();
    const productCategory = useSelector((state: AppState) => state.productCategory.productCategory);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchAllProductCategoryAsync({ offset: 0, limit: 6 }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData(); // Call the async function immediately
    }, [dispatch]);

    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        categoryId: '',
        images: ['', '', ''],
    });

    const [errors, setErrors] = useState({
        title: '',
        price: '',
        description: '',
        categoryId: '',
        image_1: '',
        image_2: '',
        image_3: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        let error = '';
        if (name === 'title' && !value.trim()) {
            error = 'Title is required';
        }
        if (name === 'price' && !value.trim()) {
            error = 'Price is required';
        }
        if (name === 'description' && !value.trim()) {
            error = 'Description is required';
        }
        if (name === 'categoryId' && !value.trim()) {
            error = 'Category Id is required';
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
        event.preventDefault();
        console.log('formData');
        console.log(formData);
        dispatch(submitAddProduct(formData));
    };

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
                <p className="text-gray-600 font-medium">Add Product</p>
            </div>
            <ToastContainer position="top-right" />
            {/* end breadcrumb */}

            {/* account wrapper */}
            <div className="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
                {/* sidebar */}
                <UserProductSidebar />
                {/* sidebar */}

                {/* info */}
                <div className="col-span-9 grid grid-cols-3 gap-4">
                    <div className="col-span-8 border border-gray-200 p-4 rounded">
                        <h3 className="text-lg font-medium capitalize mb-4">Product Information</h3>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="text-gray-600">Title
                                        <span className="text-primary">*</span></label>
                                    <input type="text" name="title" id="title" className="input-box" onChange={handleInputChange} value={formData.title} />
                                    {errors.title && <span className="text-red-500">{errors.title}</span>}
                                </div>
                                <div>
                                    <label htmlFor="price" className="text-gray-600">Price
                                        <span className="text-primary">*</span></label>
                                    <input type="text" name="price" id="price" className="input-box" onChange={handleInputChange} value={formData.price} />
                                    {errors.price && <span className="text-red-500">{errors.price}</span>}
                                </div>
                                <div>
                                    <label htmlFor="description" className="text-gray-600">Description
                                        <span className="text-primary">*</span></label>
                                    <input type="text" name="description" id="description" className="input-box" onChange={handleInputChange} value={formData.description} />
                                    {errors.description && <span className="text-red-500">{errors.description}</span>}
                                </div>
                                <div>
                                    <label htmlFor="categoryId">Category ID<span className="text-primary">*</span></label>
                                    <select name="categoryId" id="categoryId" className="input-box" onChange={handleInputChange} value={formData.categoryId}>
                                        {productCategory.map((item, index) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                    {errors.categoryId && <span className="text-red-500">{errors.categoryId}</span>}
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label htmlFor="image_1" className="text-gray-400">Image 1 <span
                                            className="text-primary">*</span></label>
                                        <input type="text" name="image_1" id="image_1" className="input-box" onChange={handleInputChange} value={formData.images[0]} />
                                        {errors.image_1 && <span className="text-red-500">{errors.image_1}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="image_2" className="text-gray-400">Image 2
                                            <span className="text-primary">*</span></label>
                                        <input type="text" name="image_2" id="image_2" className="input-box" onChange={handleInputChange} value={formData.images[1]} />
                                        {errors.image_2 && <span className="text-red-500">{errors.image_2}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="image_3" className="text-gray-400">Image 3 <span
                                            className="text-primary">*</span></label>
                                        <input type="text" name="image_3" id="image_3" className="input-box" onChange={handleInputChange} value={formData.images[2]} />
                                        {errors.image_3 && <span className="text-red-500">{errors.image_3}</span>}
                                    </div>
                                </div>
                                <button type="submit" disabled={!isFormValid}
                                    className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* info */}
            </div>
            {/* account wrapper */}
            <Footer />
        </>
    )
}

export default AddProductPage;