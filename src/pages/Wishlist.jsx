import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import {
  getUserProductWishlist,
  addProdToCart,
} from "../features/users/userSlice";
import { addToWishlist } from "../features/products/productSlice";
import { toast } from "sonner";
import triggerNotification from "../components/Toast";
import { Heart, Trash2 } from "lucide-react";
const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getWishlistFromDb();
  }, []);

  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  };
  // const { userWishlist } = useSelector((state) => state.user);

  const wishlistState = useSelector(
    (state) => state?.auth?.user?.wishlist?.wishlist
  );
  // console.log("wishlist State", wishlistState);
  console.log(wishlistState);

  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    triggerNotification("info", "Removeed Product From Whishlist");

    setTimeout(() => {
      // window.location.reload();
      dispatch(getUserProductWishlist());
    }, 300);
  };

  // add to cart
  const handleAddToCart = () => {
    // if(authState) {
    dispatch(
      addProdToCart({
        productId: item._id,
        price: item.price,
        quantity,
      })
    );
    //   &&
    //     triggerNotification(
    //       "success",
    //       `${item?.title.substring(0, 15)} added successfully!`
    //     );
    // } else {
    //   triggerNotification("error", "You Need To Regiser First");
    // }

    //   // && toast.success(`${item?.title.substring(0, 15)} added successfully!`);
    //   // setOpenModal(true);
  };
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-3 bg-gray-100">
        {/* <h1 className="text-3xl font-medium mb-6">
          Wishlist ({wishlistState?.length || 0})
        </h1> */}
        <div>
          {/* {wishlistState &&
            wishlistState?.map((item, index) => (
              <div className="grid grid-cols-4" key={index}>
                <div className="wishlist-card relative ">
                  <RxCross2
                    className="absolute right-0 cursor-pointer bg-gray-200 hover:bg-red-700 hover:text-white rounded-full m-2 p-1"
                    size={32}
                    onClick={() => {
                      removeFromWishlist(item?._id);
                    }}

                  
                  />

                  <div className="wishlist-card-image">
                    <img
                      src={
                        item?.images[0]?.url
                          ? item?.images[0]?.url
                          : "/images/watch.png"
                      }
                     
                      className="img-fluid w-100 rounded-xl"
                      alt="watch"
                    />
                  </div>
                  <div className="py-3 px-3">
                    <h5 className="title">{item?.title}</h5>
                    <h6 className="price">₹{item?.price}</h6>
                  </div>
                </div>
              </div>
            ))} */}

          <div className=" ">
            {/* <header className="bg-white shadow rounded-2xl">
              <div className="py-4 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  My Wishlist
                </h1>
              </div>
            </header> */}
            <main>
              {!wishlistState?.length && (
                <div className="error-box">
                  <div className="flex justify-center items-center">
                  <span class="icon-[solar--heart-angle-bold-duotone] h-32 w-32 mt-32 text-gray-400 animate-pulse"></span>
                  </div>
                  {/* <h3 class="h2 fnt mb-3">Oops! This Page is Not Found.</h3> */}
                  <p class="my-6 flex justify-center align-middle items-center text-2xl font-medium">
                    No Products Found In Wishlist.
                  </p>
                  <div className="flex justify-center">
                    <Link
                      to="/"
                      class="inline-block px-5 py-2 my-9 mx-auto text-white bg-green-600 rounded-full hover:bg-green-700 md:mx-0"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>
              )}
              <div className="py-6">
                <div className="px-4 py-6 sm:px-0">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {wishlistState &&
                      wishlistState?.map((item) => (
                        <div
                          key={item._id}
                          className="bg-white overflow-hidden shadow-sm rounded-2xl hover:shadow-custom-shadow"
                        >
                          <div className="p-3">
                            <img
                              src={item.images[0]?.url}
                              alt={`Wishlist item ${item.images[0]?.url}`}
                              className="w-full h-52 object-cover mb-4 rounded-xl"
                            />
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                              {item?.title}
                            </h2>
                            <p className="text-gray-600 mb-4">
                              This is a description of the wishlist item. It's
                              something you really want!
                            </p>
                            {/* <div className="flex justify-between items-center">
                              <span className="text-2xl font-semibold text-gray-900">
                                ₹ {item?.price || "0"}
                              </span>
                            </div> */}
                            <div className="flex justify-between items-center mt-4">
                            <div className="font-semibold text-lg"> ₹ {item?.price || "0"}</div>
                              <div className="space-x-2 ">
                               
                                <button
                                  onClick={() =>
                                    dispatch(
                                      addProdToCart({
                                        productId: item._id,
                                        price: item.price,
                                        // quantity:item?.quantity,
                                      })
                                    ) && removeFromWishlist(item?._id)
                                  }
                                  className="border rounded-2xl p-2 px-3 hover:bg-green-600 hover:text-white"
                                >
                                  Add To Cart
                                </button>
                                <button
                                  onClick={() => {
                                    removeFromWishlist(item?._id);
                                  }}
                                  className="border rounded-2xl p-2 px-3 hover:bg-green-600 hover:text-white"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/* { wishlistState?.map((item, index) => {
              return(
                <div className="col-3" key={item.id}>
                <div className="wishlist-card position-relative">
                  <img
                    src={item?.images[0]?.url ?  item?.images[0]?.url : "/images/watch.png"}
                    alt="cross"
                    className="position-absolute cross img-fluid"
                  />
                  <div className="wishlist-card-image">
                    <img
                      src="images/watch.jpg"
                      className="img-fluid w-100"
                      alt="watch"
                    />
                  </div>
                  <div className="py-3 px-3">
                    <h5 className="title">
                     {item?.title}
                    </h5>
                    <h6 className="price">₹{item?.price}</h6>
                  </div>
                </div>
              </div>
              )
            }) 
          } */}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
