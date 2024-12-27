import { motion } from "framer-motion";

const ImageShine = () => {
  return (
    <div className="flex justify-center items-center">
        {/* <div className="absolute inset-0 bg-black opacity-40 blur-xl z-40"></div> */}
      <div className="w-64 relative  bg-gray-50 rounded-2xl shadow-custom-shadow  ">
        <motion.div
          className="shine absolute inset-0 "
          initial={{ x: "-150%" }}
          animate={{ x: "150%" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <div className="flex justify-center ">
          <img
            src="./images/logo.png"
            alt="Shining Image"
            className="w-64 p-4 h-auto object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export default ImageShine;
