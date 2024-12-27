import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
  const { title } = props;
  return (
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div className="breadcrumb mb-0 py-2 flex justify-center">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className="flex items-center justify-center mb-0">
              <Link to="/" className="text-dark flex items-center justify-center">
                <span className="icon-[solar--home-angle-bold-duotone] h-6 w-6 text-[#808080] mr-1 mb-1"></span>
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>{title}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BreadCrumb;
