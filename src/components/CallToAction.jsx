import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
const CallToAction = ({ title, description, phone, whatsapp }) => {
  return (
    <div>
      <>
        <Container>
          <div className="bg-white">
            <div className="py-8 mx-3 overflow-hidden ">
              <div className="flex flex-col  rounded-xl  overflow-hidden bg-green-50  sm:flex-row md:h-80">
                <div className="order-first ml-auto h-48 w-full  sm:order-none sm:h-auto sm:w-full lg:w-2/5">
                  <img
                    className="h-full w-full object-contain xl:px-2 xl:mt-2 "
                    src="https://cdn.shopify.com/s/files/1/0575/8920/3125/files/Weight-Loss-Care.png?v=1629540167"
                    loading="lazy"
                  />
                </div>
                <div className=" text-center flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5 lg:mt-6 ict">
                  <h1 classname=" font-semibold text-2xl  text-[#3f9c3a] mt-4 pb-4">
                    Expert Consultation For Digestive Care
                  </h1>
                  <p classname="mt-1 font-light pb-12 mx-8  ">
                    Get the best customised ayurvedic care for Digestive
                    problems on the Phone from our Experts at your comfort
                  </p>
                  <div className="flex space-x-4 lg:ml-[220px] mb-2">
                    <Link to="/contactus" >
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#3f9c3a] text-white shadow-md">
                      Contact Us
                    </button>
                    </Link>
                    <Link to="tel:+91%208160229683" >
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#54ae3c] text-white shadow-md">
                      Call Now
                    </button>
                    </Link>
                    <Link to="http://wa.me/918160229683" >
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#3f9c3a] text-white shadow-md">
                      Whatsapp
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </>
    </div>
  );
};

export default CallToAction;
