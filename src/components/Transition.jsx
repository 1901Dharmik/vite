import { motion } from "framer-motion";

const pageTransition = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const Transition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      // initial="hidden"
      // animate="visible"
      // exit="exit"
      // variants={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
