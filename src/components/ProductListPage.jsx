// import React, { useState, useEffect } from 'react';
// const products = [
//   { id: 1, name: 'Product 1', price: 10, category: 'Electronics' },
//   { id: 2, name: 'Product 2', price: 20, category: 'Fashion' },
//   { id: 3, name: 'Product 3', price: 30, category: 'Electronics' },
//   { id: 4, name: 'Product 4', price: 40, category: 'Fashion' },
//   { id: 5, name: 'Product 5', price: 50, category: 'Electronics' },
//   { id: 6, name: 'Product 6', price: 60, category: 'Fashion' },
//   { id: 7, name: 'Product 7', price: 70, category: 'Electronics' },
//   { id: 8, name: 'Product 8', price: 80, category: 'Fashion' },
//   { id: 9, name: 'Product 9', price: 90, category: 'Electronics' },
//   { id: 10, name: 'Product 10', price: 100, category: 'Fashion' },
// ];

// const ProductListPage = () => {
//   const [filteredProducts, setFilteredProducts] = useState(products);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [pageNumber, setPageNumber] = useState(1);
//   const productsPerPage = 5;

//   useEffect(() => {
//     const filtered = products
//       .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
//       .filter((product) => categoryFilter === '' || product.category === categoryFilter);
//     const sorted = filtered.sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
//     setFilteredProducts(sorted);
//   }, [searchQuery, categoryFilter, sortOrder]);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleCategoryFilter = (e) => {
//     setCategoryFilter(e.target.value);
//   };

//   const handleSortOrder = (e) => {
//     setSortOrder(e.target.value);
//   };

//   const handlePageChange = (pageNumber) => {
//     setPageNumber(pageNumber);
//   };

//   const pagination = Array(Math.ceil(filteredProducts.length / productsPerPage))
//     .fill(null)
//     .map((_, index) => index + 1);

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Product List Page</h1>
//       <div className="flex flex-wrap justify-between mb-4">
//         <input
//           type="search"
//           value={searchQuery}
//           onChange={handleSearch}
//           placeholder="Search products"
//           className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-sm text-gray-700"
//         />
//         <select
//           value={categoryFilter}
//           onChange={handleCategoryFilter}
//           className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-sm text-gray-700"
//         >
//           <option value="">All categories</option>
//           <option value="Electronics">Electronics</option>
//           <option value="Fashion">Fashion</option>
//         </select>
//         <select
//           value={sortOrder}
//           onChange={handleSortOrder}
//           className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-sm text-gray-700"
//         >
//           <option value="asc">Price: Low to High</option>
//           <option value="desc">Price: High to Low</option>
//         </select>
//       </div>
//       <table className="w-full table-auto mb-4">
//         <thead>
//           <tr>
//             <th className="px-4 py-2">ID</th>
//             <th className="px-4 py-2">Name</th>
//             <th className="px-4 py-2">Price</th>
//             <th className="px-4 py-2">Category</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts
//             .slice((pageNumber - 1) * productsPerPage, pageNumber * productsPerPage)
//             .map((product) => (
//               <tr key={product.id}>
//                 <td className="px-4 py-2">{product.id}</td>
//                 <td className="px-4 py-2">{product.name}</td>
//                 <td className="px-4 py-2">{product.price}</td>
//                 <td className="px-4 py-2">{product.category}</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//       <div className="flex justify-center mb-4">
//         {pagination.map((pageNumber) => (
//           <button
//             key={pageNumber}
//             onClick={() => handlePageChange(pageNumber)}
//             className={`px-4 py-2 ${pageNumber === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
//           >
//             {pageNumber}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductListPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const base_url = 'http://localhost:8000/api/'; // Replace with your actual API base URL

const getProducts = async (data) => {
  const response = await axios.get(
    `${base_url}product?${data?.brand ? `brand=${data?.brand}&` : ""}${
      data?.tag ? `tags=${data?.tag}&` : ""
    }${data?.category ? `category=${data?.category}&` : ""}${
      data?.minPrice ? `price[gte]=${data?.minPrice}&` : ""
    }${data?.maxPrice ? `price[lte]=${data?.maxPrice}&` : ""}${
      data?.sort ? `sort=${data?.sort}&` : ""
    }`
  );
  if (response.data) {
    return response.data;
  }
  return [];
};

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [pageNumber, setPageNumber] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      const data = {
        category: categoryFilter,
        sort: sortOrder === 'asc' ? 'price' : '-price',
      };
      const response = await getProducts(data);
      setProducts(response);
      setFilteredProducts(response);
    };
    fetchProducts();
  }, [categoryFilter, sortOrder]);

  useEffect(() => {
    const filtered = products
      .filter((product) => product.title.toLowerCase().includes(searchQuery?.toLowerCase()))
      .filter((product) => categoryFilter === '' || product.category === categoryFilter);
    const sorted = filtered.sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
    setFilteredProducts(sorted);
  }, [searchQuery, categoryFilter, sortOrder, products]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const pagination = Array(Math.ceil(filteredProducts.length / productsPerPage))
    .fill(null)
    .map((_, index) => index + 1);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product List Page</h1>
      <div className="flex flex-wrap justify-between mb-4">
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search products"
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-sm text-gray-700"
        />
        <select
          value={categoryFilter}
          onChange={handleCategoryFilter}
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-sm text-gray-700"
        >
          <option value="">All categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
        </select>
        <select
          value={sortOrder}
          onChange={handleSortOrder}
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-sm text-gray-700"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      <table className="w-full table-auto mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts
            .slice((pageNumber - 1) * productsPerPage, pageNumber * productsPerPage)
            .map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-2">{product._id}</td>
                <td className="px-4 py-2">{product.title}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">{product.category}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-center mb-4">
        {pagination.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 ${pageNumber === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
