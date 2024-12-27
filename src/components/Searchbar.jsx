import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactDOM from "react-dom"; // Import ReactDOM for creating the portal
import { X, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";

const SearchModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const products = useSelector((state) => state?.product?.product);
  const [filteredProducts, setFilteredProducts] = useState(products); // Initialize filteredProducts with all products
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-yellow-200">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Use React Portal to render the modal in the body
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[60] overflow-auto bg-black bg-opacity-40 flex items-start justify-center pt-16">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl m-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Search Products</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
          >
            <X size={24} />
          </button>
        </div>
        <div className="relative mb-4">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none !important "
          />
          <Search
            className="absolute right-3 top-2.5 text-gray-400"
            size={20}
          />
        </div>
        <div className="max-h-96 overflow-y-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="mb-4 p-4 border border-gray-200 rounded-md"
            >
              <div className="flex">
                <img src={product?.images[0]?.url} className="rounded-xl h-16 w-16" alt="" />
                <div className="ml-6">
                  <h3 className="text-lg font-semibold mb-1">
                    {highlightText(product?.title, searchTerm)}
                  </h3>
                  <p className="text-gray-600">
                    {highlightText(product.category, searchTerm)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-gray-500 text-center">No products found</p>
          )}
        </div>
      </div>
    </div>,
    document.body // The modal is now rendered at the root level
  );
};

const Searchbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "z" && (event.ctrlKey || event.metaKey)) {
        openModal();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
         Search
      </button>
      <SearchModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Searchbar;
