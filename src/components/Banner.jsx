import React from "react";
import { motion } from "framer-motion";
import { Shield, Droplet, Atom, Stethoscope } from "lucide-react";
export default function Banner() {
  return (
    <>
      <div className="min-h-screen lg:min-h-screen bg-gradient-to-br from-primary-100 to-primary-50 relative overflow-hidden">
        {/* Grid overlay */}
        {/* <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50" />
        <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-purple-100 via-pink-100 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-yellow-100 via-orange-100 to-transparent" />
      </div> */}
        <div
          className="absolute inset-0 z-0 css-5n2672 "
          style={{
            height: "400px",
            width: "75%",
            top: "0px",
            // top: '32px',
            right: "33%",
            position: "absolute",
            maskImage:
              "radial-gradient(black, black 0px, transparent 95%, transparent 100%)",
            backgroundPosition: "center bottom 1px",
            // backgroundImage: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16' fill='none' stroke='rgb(15 23 42 / 0.05)'%3e%3cpath d='M0 .5H15.5V16'/%3e%3c/svg%3e"),
          }}
        />
        {/* Hero Section */}
        <main className="relative  z-10 flex flex-col md:flex-row lg:flex-row justify-between  items-center px-4 mt-8 md:mt-0 lg:mt-0 max-w-screen-2xl mx-auto">
          <div className="max-w-2xl">
            <div className="flex-1 max-w-lg sm:mx-auto sm:text-center  lg:max-w-max lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h3 className="text-3xl text-gray-800 font-semibold md:text-4xl lg:text-5xl">
                  {/* build your websites with <br />
                  <span className="text-green-600">high performance</span> */}
                  <h2 className="text-xl lg:text-xl mb-4 font-thin">
                    Welcome to Sajivan Ayurveda
                  </h2>
                  <h1 className="text-md lg:text-6xl font-bold mb-6">
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
            <div className="mt-8 flex items-center space-x-4 text-sm text-gray-500">
              <span>✓ Trusted by 11000+ People</span>
              <span>✓ 100+ Carefully crafted UI components</span>
            </div>
          </div>

          <div className=" lg:block">
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
        </main>
            
      </div>
      <div className="w-full lg:w-full flex justify-center mx-auto items-center overflow-hidden bg-white py-3">
        <motion.div
          className="flex whitespace-nowrap"
          variants={marqueeVariants}
          animate="animate"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex">
              <MarqueeItem icon={Shield} text="NO SIDE EFFECTS" />
              <MarqueeItem icon={Droplet} text="AYUYSH CRETIFYED" />
              <MarqueeItem icon={Atom} text="PLANT BASED" />
              <MarqueeItem icon={Stethoscope} text="GMP CRETIFYED" />
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
const marqueeVariants = {
  animate: {
    x: [0, -2070],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 40,
        ease: "linear",
      },
    },
  },
};

const MarqueeItem = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-2 mx-4">
    <Icon className="h-6 w-6" />
    <span className="text-sm font-medium">{text}</span>
  </div>
);
