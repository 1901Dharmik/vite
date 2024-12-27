import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div >
        <div >
          <div class="">
            <div class="flex justify-center items-center align-middle ">
              <img
                loading="lasy"
                src="./images/pageNotFound.gif"
                alt=""
              
              />
              {/* <img
                loading="lasy"
                src="./images/404error.svg"
                alt=""
                class="max-h-[400px]"
              /> */}
            </div>
            {/* <h3 class="h2 fnt mb-3">Oops! This Page is Not Found.</h3> */}
            <p class="flex justify-center align-middle items-center text-2xl font-medium">
            
              The requested page dose not exist.
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
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
