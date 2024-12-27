import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppWidget from "react-whatsapp-chat-widget";
import "react-whatsapp-chat-widget/index.css";
import { ToastContainer, toast } from "react-toastify";
import { Toaster } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import Header2 from "./Header2";
import { motion } from "framer-motion";
import { ArrowRight, Headset,Phone } from "lucide-react";
import { Icon } from "@iconify/react";
import logo1 from "../../public/images/logo1.png";
const Layout = () => {
  const location = useLocation();
  const buttonVariants = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 10, rotate: 360, opacity: 1 },
  };
  const isProductPage = location?.pathname?.startsWith("/product");
  return (
    <React.Fragment>
      <Header />
      {/* <Header2/> */}
      <Outlet />
      <ToastContainer />
      {/* <Toaster position="top-center expand="true"" /> */}
      <Toaster richColors position="top-right" expand="true" />
      <div className={``}>
        <WhatsAppWidget
          phoneNo="919714860995"
          position="right"
          widgetWidth="300px"
          widgetWidthMobile="300px"
          autoOpen={false}
          autoOpenTimer={5000}
          // messageBox={true}
          messageBoxTxt=""
          iconSize="50"
          iconColor="white"
          iconBgColor="#318e4c"
          headerIcon={logo1}
          headerIconColor="pink"
          headerTxtColor="white"
          headerBgColor="#206c43"
          headerTitle="Sajivan Ayurveda"
          headerCaption="Welcome To Sajivan Ayurveda"
          bodyBgColor=""
          chatPersonName="Support"
          chatMessage={
            <>
              Hi there 👋
              <br />
              How can I help you?
            </>
          }
          footerBgColor="#999"
          btnBgColor="#206c43"
          btnTxtColor="white"
          btnTxt="Start Chat"
        />
      </div>
      <div className="relative w-full  z-10">
        <Link to="tel:+91%208160229683">
        <motion.button
          initial="initial"
          animate="animate"
          variants={buttonVariants}
          transition={{ duration: 2, type: "spring", stiffness: 50 }}
          className="bg-gradient-to-br from-green-700 to-green-400 text-white rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 fixed bottom-4 lg:left-4"
          aria-label="Scroll Animation"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale:  0.8}}
        >
          <Icon icon="solar:call-dropped-rounded-bold-duotone"  className="h-8 w-8 opacity-80 text-white" />
          {/* <Phone className="h-6 w-6" strokeWidth={2} /> */}
        </motion.button>
        </Link>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
