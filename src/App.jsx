import React, { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { Loader2 } from "lucide-react";
import LogoShine from "./components/LogoShine";
import Transition from "./components/Transition";
import { OpenRoutes } from "./routes/OpenRoutes";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import MaintenanceMode from "./components/MaintenancePage";
// import Loader from "./components/Loader";
const Loader = () => {
  return (
    // <div className="flex items-center justify-center h-screen">
    //   <Loader2 className="w-12 h-12 animate-spin text-primary mx-4" />
    //   <p>Loading...</p>
    //   {/* <LogoShine/> */}
    // </div>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <Loader2 className="w-14 h-14 animate-spin text-primary mx-4 text-green-600" />
      <motion.p
        className="mt-4 text-2xl font-bold tex-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        SAJIVAN AYURVEDA
      </motion.p>
    </div>
  );
};
// Lazy load the components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Singup"));
const Forgotpassword = lazy(() => import("./pages/Forgotpassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const SingleCategory = lazy(() => import("./pages/SingleCategory"));
const NewPage = lazy(() => import("./pages/NewPage"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Orders = lazy(() => import("./pages/Orders"));
const Example = lazy(() => import("./pages/Example"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const PageNotFound = lazy(() => import("./pages/Error/PageNotFound"));
const RefundsAndCancellation = lazy(() =>
  import("./pages/RefundsAndCancellation")
);
const MaintenancePage = lazy(() => import("./pages/MaintenancePage"));
const PrivacyAndPolicy = lazy(() => import("./pages/PrivacyAndPolicy"));
const TermsAndCondition = lazy(() => import("./pages/TermsAndCondition"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Profile = lazy(() => import("./pages/Profile"));
const KnowledgeCenter = lazy(() => import("./pages/KnowledgeCenter"));
const Error401 = lazy(() => import("./pages/Error/Error401"));
const Error505 = lazy(() => import("./pages/Error/Error505"));
// const OpenRoutes = lazy(() => import("./routes/OpenRoutes"));
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Extra from "./pages/Extra";
import { base_url } from "./utils/axiosConfig";
const VITE_STRIPE_PUBLISH_KEY = import.meta.env.VITE_STRIPE_PUBLISH_KEY
const stripePromise = loadStripe(VITE_STRIPE_PUBLISH_KEY);
// console.log("stripePromise is", JSON.stringify(stripePromise));

export default function App() {
  const [maintenanceMode, setMaintenanceMode] = useState(null);

  useEffect(() => {
    const fetchMaintenanceSettings = async () => {
      try {
        const { data } = await axios.get(`${base_url}admin/maintenance/settings`);
        if (data.isMaintenanceModeActive) {
          setMaintenanceMode({
            message: data.maintenanceMessage,
            estimatedDowntime: data.estimatedDowntime,
          });
        }
      } catch (error) {
        console.error("Error fetching maintenance settings:", error);
      }
    };

    fetchMaintenanceSettings();
  }, []);

  if (maintenanceMode) {
    return <MaintenanceMode {...maintenanceMode} />;
  }

  return <New />;

}

 const New = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Wrap Routes in Suspense with a fallback */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              exact
              element={
                <Transition>
                  <Home />
                </Transition>
              }
            />
            <Route path="login" element={<OpenRoutes><Login /></OpenRoutes>} />
            <Route path="signup" element={<OpenRoutes><Signup /></OpenRoutes>} />
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="cart" element={<Cart />} />
            <Route path="extra" element={<Extra />} />
            <Route
              path="checkout"
              element={
                <Elements stripe={stripePromise}>
                  <Checkout />
                </Elements>
              }
            />
            <Route
              path="product/:id"
              element={
                <Transition>
                  <SingleProduct />
                </Transition>
              }
            />
            <Route path="category/:id" element={<SingleCategory />} />
            <Route path="newpage" element={<NewPage />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="my-orders" element={<PrivateRoutes><Orders /></PrivateRoutes>} />
            <Route path="example" element={<Example />} />
            <Route path="contactus" element={<ContactUs />} />
            <Route
              path="refunds-cancellation"
              element={<RefundsAndCancellation />}
            />
            <Route path="privacy-policy" element={<PrivacyAndPolicy />} />
            <Route path="terms-condition" element={<TermsAndCondition />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="knowledge-center/gujarati"
              element={<KnowledgeCenter />}
            />
            <Route path="/error/401" element={<Error401 />} />
            <Route path="/error/505" element={<Error505 />} />
            {/* Redirect invalid paths to PageNotFound */}
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Route>
          <Route path="about" element={<About />} />
          {/* Define a standalone PageNotFound route */}
          <Route path="/not-found" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
 }
