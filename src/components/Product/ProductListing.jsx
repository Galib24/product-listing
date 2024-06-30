import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../serveices/productServices';
// import { FaStar } from 'react-icons/fa';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    // data fetching part
    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    const handleSort = (order) => {
        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (order === 'asc') return a.price - b.price;
            return b.price - a.price;
        });
        setFilteredProducts(sortedProducts);
        setSortOrder(order);
    };


    // filter part
    const handleFilter = (category) => {


        setLoading(true);


        setTimeout(() => {
            if (category === 'all') {
                setFilteredProducts(products);
            } else {
                const filtered = products.filter(product => product.category === category);
                setFilteredProducts(filtered);
            }
            setCurrentPage(1);

            setLoading(false);
        }, 1000);
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


    // loader
    if (loading) {
        return (<div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <p className="text-black text-3xl font-bold">Loading...</p>
            </div>
        </div>
        );
    }



    return (
        <>
            <div className="">
                <div className="flex flex-wrap justify-center gap-2 sm:justify-center sm:space-x-4 my-4">
                    <button
                        onClick={() => handleFilter('all')}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        All Products
                    </button>
                    <button
                        onClick={() => handleFilter('electronics')}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Electronics
                    </button>
                    <button
                        onClick={() => handleFilter('jewelery')}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Jewelery
                    </button>
                    <button
                        onClick={() => handleFilter("men's clothing")}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Men's Clothing
                    </button>
                    <button
                        onClick={() => handleFilter("women's clothing")}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Women's Clothing
                    </button>
                </div>


                <div className="flex flex-wrap justify-center gap-2 sm:justify-center sm:space-x-4 my-4">
                    <button onClick={() => handleSort('asc')} className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400'> Low to High</button>
                    <button onClick={() => handleSort('desc')} className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400'>High to Low</button>
                </div>

                
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentProducts.map(product => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-48 object-cover hover:scale-110 transition duration-500 cursor-pointer"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{product.title}</h3>
                                    <div className="flex justify-between items-center my-2">
                                        <p className="text-gray-700 text-sm lg:text-base">${product.price}</p>
                                        <p className="text-gray-700 text-sm lg:text-base">Rating {product.rating.rate}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                <div className="flex justify-center my-4">
                    {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className="mx-1 px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

            </div>


        </>
    );
};

export default ProductListing;