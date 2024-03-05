import CategoryList from '../../components/CategoryList/CategoryList';

const CategoryPage = () => {
    return (
        <>
            <div className="container py-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">shop by category</h2>
                <CategoryList/>
            </div>
        </>
    )
}

export default CategoryPage;