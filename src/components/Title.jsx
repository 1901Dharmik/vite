import React from "react";
import { Link } from "react-router-dom";
const Tittle = ({ name, head }) => {
  return (
    <>
      {/* <div className=" section-margin-top-30 ">
      <div className="what-is-new-section py-12 sm:py-0">
        <div className="w-full">
          <div className="col-md-12 heading-part">
            <h2>{heading.name}</h2>
            <hr className="weight-loss-kit-bg-color" />
            <p>{heading.head}</p>
          </div>
        </div>
      </div>
    </div> */}
      <div className="mx-auto px-4 sm:px-2 lg:py-12 py-6 ">
        <h2 className="lg:text-4xl font-semibold title-font tex-bg  text-center mb-2 text-2xl">{name}</h2>
        <div className="w-20 h-1 bg-black rounded-2xl mx-auto mb-4"></div>
        <p className="text-center text-gray-600">{head}</p>
      </div>
    </>
  );
};

export default Tittle;
