// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getCategories } from "../features/pcategory/pcategorySlice";
// import { getAllProducts } from "../features/products/productSlice";
// import { Link, useLocation } from "react-router-dom";
// import Container from "../components/Container";
// import ProductCard from "../components/ProductCard";

// const SingleCategory = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const categoryState = useSelector((state) => state?.pCategory?.pCategories);
//   const productsState = useSelector((state) => state?.product?.product);

//   // Decode category name from URL
//   const getCategoryName = decodeURIComponent(location.pathname.split("/")[2]);

//   const [categoryProduct, setCategoryProduct] = useState([]);

//   useEffect(() => {
//     dispatch(getCategories());
//     dispatch(getAllProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     if (productsState && categoryState) {
//       const filteredProducts = productsState.filter(
//         (product) => product?.category === getCategoryName
//       );
//       setCategoryProduct(filteredProducts);
//     }
//   }, [productsState, getCategoryName, categoryState]);

//   const [currentCategory, setCurrentCategory] = useState(null);
//   console.log("currentCategory", currentCategory);

//   useEffect(() => {
//     if (categoryState) {
//       // Find the current category object from the categoryState
//       const foundCategory = categoryState.find(
//         (category) => category?.title === getCategoryName
//       );
//       setCurrentCategory(foundCategory);
//     }
//   }, [categoryState, getCategoryName]);

//   return (
//     <div>
//       <Container class1="popular-wrapper py-5 home-wrapper-2">
//         <div className="grid grid-cols-4">
//           <div className="col-span-2"></div>
//           <div className="col-span-2">
//             {/* <h3 className="section-heading">{getCategoryName}</h3> */}

//             <div className="">
//               <p>{currentCategory?.title}</p>
//               <img
//                 src={currentCategory?.images[1]?.url}
//                 className="rounded-xl"
//                 alt=""
//               />
//             </div>
//           </div>
//         </div>
//         <div className="grid grid-cols-4 gap-2 mx-2">
//           {categoryProduct?.length > 0 ? (
//             categoryProduct.map((item) => (
//               <ProductCard item={item} key={item._id} />
//             ))
//           ) : (
//             <p>No products found in this category.</p>
//           )}
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default SingleCategory;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getAllProducts } from "../features/products/productSlice";
import { Link, useLocation } from "react-router-dom";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";

const SingleCategory = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state?.pCategory?.pCategories);
  const productsState = useSelector((state) => state?.product?.product);
  
  // Decode and trim category name from URL
  const getCategoryName = decodeURIComponent(location.pathname.split("/")[2]).trim();
  
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  // Dispatch actions to fetch categories and products
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
  }, [dispatch]);

  // Filter products based on categories
  useEffect(() => {
    if (productsState && categoryState) {
      // Find the current category object
      const foundCategory = categoryState.find(
        (category) => category?.title?.trim() === getCategoryName
      );
      setCurrentCategory(foundCategory);

      // Filter products that include the current category
      const filteredProducts = productsState.filter((product) => 
        // Check if product categories includes the current category (case-insensitive and trimmed)
        product?.category?.some(
          (cat) => cat.trim().toLowerCase() === getCategoryName.toLowerCase()
        )
      );
      
      setCategoryProduct(filteredProducts);
    }
  }, [productsState, getCategoryName, categoryState]);

  return (
    <div>
      <Container className="popular-wrapper py-5 home-wrapper-2">
        <div className="grid grid-cols-4">
          <div className="col-span-2"></div>
          <div className="col-span-2">
            {currentCategory && (
              <div className="">
                <p>{currentCategory.title}</p>
                {currentCategory.images && currentCategory.images[1] && (
                  <img
                    src={currentCategory.images[1].url}
                    className="rounded-xl"
                    alt={currentCategory.title}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mx-2">
          {categoryProduct?.length > 0 ? (
            categoryProduct.map((item) => (
              <ProductCard item={item} key={item._id} />
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default SingleCategory;