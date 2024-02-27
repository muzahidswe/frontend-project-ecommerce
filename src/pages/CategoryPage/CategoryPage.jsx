import React from "react";
import CategoryList from '../../components/CategoryList/CategoryList';

const CategoryPage = () => {
    return (
        <>
            <div class="container py-16">
                <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">shop by category</h2>
                <CategoryList/>
            </div>
        </>
    )
}

export default CategoryPage;