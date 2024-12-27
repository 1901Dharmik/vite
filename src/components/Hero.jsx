import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <>
      {/* <div className="bg-gradient-to-b from-green-50 to-green-100 "> */}
      <div className="bg-image-setting bg-transparent bg-image h-full lg:h-screen opacity-100" >
        <section className="relative max-w-screen-2xl mx-auto px-4 md:px-8" >
          <div className="absolute top-0 left-0 w-full h-full opacity-40"></div>
          <div className="relative gap-5 items-center lg:flex">
            <div className="flex-1 max-w-lg py-6 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h3 className="text-3xl text-gray-800 font-semibold md:text-4xl lg:text-5xl">
                  {/* build your websites with <br />
                  <span className="text-green-600">high performance</span> */}
                  <h2 className="text-sm lg:text-xl mb-4">Welcome to Sajivan Ayurveda</h2>
                  <h1 className="text-md lg:text-5xl font-bold mb-6">
                    <span className="text-[#111]">Join The </span>
                    <span className="text-[#318e4c]">Digital</span>
                    <br />
                    <span
                      className="text-[#318e4c] pt-2"
                      style={{ lineHeight: "1.5" }}
                    >
                      Ayurvedic
                    </span>
                    <span className="text-[#111] pl-3">Center</span>
                  </h1>
                </h3>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <p className="text-gray-500 leading-relaxed mt-3">
                  Nam erat risus, sodales sit amet lobortis ut, finibus eget
                  metus. Cras aliquam ante ut tortor posuere feugiat. Duis
                  sodales nisi id porta lacinia.
                </p>
              </motion.p>
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <a
                  className="mt-5 px-4 py-2 text-green-600 font-medium bg-green-50 rounded-full inline-flex items-center"
                  href="javascript:void()"
                >
                  Try it out
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-1 duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </motion.button>
            </div>
            <div className="flex-1 mt-5 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto">
              <div className="">
                <img
                  src="./images/doc.png"
                  alt=""
                  className="w-full"
                  style={{
                    opacity: "1",
                    maskImage:
                      "linear-gradient(to bottom, black 50%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        {/* </div> */}
      </div>
    </>
  );
};

export default HeroSection;
