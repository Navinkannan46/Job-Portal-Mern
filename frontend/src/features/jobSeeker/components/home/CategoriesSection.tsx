import { Link } from "react-router-dom";

const categories = [
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "Finance",
    "Operations",
    "Data Science",
    "Product",
];

const CategoriesSection = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            to="/jobs"
                            className="bg-white rounded-xl border p-4 text-center font-medium text-sm hover:shadow-md hover:border-indigo-400 transition-all"
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;