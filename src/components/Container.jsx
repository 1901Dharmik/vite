import React from "react";

const Container = (props) => {
  return (
    <section className={props.class1}>
      {/* px-4 */}
      <div className="mx-auto max-w-screen-xl xl:px-4 px-0 2xl:px-0 ">{props.children}</div>
    </section>
  );
};

export default Container;
