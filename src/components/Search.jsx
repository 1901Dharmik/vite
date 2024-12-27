import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";

const Search = ({ setSearchModal }) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.product.product);

  // Debounce logic: This useEffect will run the search after the user stops typing for 300ms
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length) {
        const results = data.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(results);
      } else {
        setFilteredData(data); // Show all products when there's no search query
      }
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout if query changes
  }, [query, data]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-model bg-white/0 bg-opacity-75 backdrop-blur">
        <div className="form-field md:p-5">
          <input
            onChange={onChange}
            type="text"
            autoFocus
            placeholder="Search For Products"
            value={query}
          />
          <svg
            onClick={() => setSearchModal(false)}
            xmlns="http://www.w3.org/2000/svg"
            fill="#EEF8F0"
            viewBox="0 0 14 14"
            height={32}
            width={32}
            id="Block-2--Streamline-Flex"
          >
            <desc>{"Block 2 Streamline Icon: https://streamlinehq.com"}</desc>
            <g id="block-2--remove-circle-garbage-trash-delete-cross-x">
              <path
                id="Vector"
                stroke="#206c43"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 13.25c4 0 6.25 -2.25 6.25 -6.25S11 0.75 7 0.75 0.75 3 0.75 7 3 13.25 7 13.25Z"
                strokeWidth={1}
              />
              <path
                id="Vector_2"
                stroke="#206c43"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.375 11.625 9.25 -9.25"
                strokeWidth={1}
              />
              <path
                id="Vector_3"
                stroke="#206c43"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.625 11.625 -9.25 -9.25"
                strokeWidth={1}
              />
            </g>
          </svg>
        </div>

        <div className="search-result-contant flex shadow max-h-[400px]">
          <div className="search-result grid lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <Link
                //   to={"/product/" + item?._id} refresh="true"
                  className="search-result-item"
                  key={item._id}
                  onClick={() => {
                    navigate("/product/" + item?._id);
                    // navigate(`product/${item?._id}`)
                    setSearchModal(false);
                    // window.reload();
                    window.location.reload();
                  }}
                >
                  <div className="image-container">
                    <img
                      src={item?.images[0]?.url}
                      alt={item?.title}
                      className="h-full w-full object-cover object-center rounded-md"
                    />
                  </div>
                  <div className="prod-details">
                    <span className="p-name">{item?.title}</span>
                    <span className="descript flex flex-end">
                      ₹{item?.price}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <span>No results found</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
