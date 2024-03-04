import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DEFAULT_IMAGE_URL } from '../../utils/apiUtils';
import { AppState, useAppDispatch } from "../../redux/store/store";
import { fetchAllProductCategoryAsync } from '../../redux/slices/CategorySlice';

const CategoryList = () => {
    const dispatch = useAppDispatch();
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

    const productCategory = useSelector((state: AppState) => state.productCategory.productCategory);

    const handleImageError = (event: any) => {
        // Set a default image if the original image fails to load
        event.target.src = DEFAULT_IMAGE_URL
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-3">
                {productCategory.map((item, index) => (
                    <div key={item.id} className="relative rounded-sm overflow-hidden group">
                        <img src={item.image} alt="category 1" className="w-full" onError={handleImageError}/>
                        <Link to="/"
                            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">{item.name}
                        </Link>
                    </div>
                ))}
            </div> 
        </>
    );
}

export default CategoryList;