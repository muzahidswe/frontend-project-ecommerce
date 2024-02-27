import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const fetchCategory = async () => {
            await fetch("https://api.escuelajs.co/api/v1/categories/?offset=0&limit=6")
                .then((res) => res.json())
                .then((data) => setCategory(data))
        }
        fetchCategory();
    }, []);

    const defaultImg = 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png';
    const handleImageError = (event) => {
        // Set a default image if the original image fails to load
        event.target.src = defaultImg
    };

    return (
        <>
            <div class="grid grid-cols-3 gap-3">
                {category.map((item, index) => (
                    <div class="relative rounded-sm overflow-hidden group">
                        <img src={item.image} alt="category 1" class="w-full" onError={handleImageError}/>
                        <Link to="/"
                            class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">{item.name}
                        </Link>
                    </div>
                ))}
            </div> 
        </>
    );
}

export default CategoryList;