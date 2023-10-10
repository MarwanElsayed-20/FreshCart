import React from "react";
import { Helmet } from "react-helmet";
import ComponentCover from "../ComponentCover/ComponentCover";
import notFoundImg from "../../Assets/error.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found</title>
      </Helmet>
      <ComponentCover text={"Not Found"} path={"Not Found"} />
      <div className="my-5 d-flex justify-content-center align-items-center">
        <LazyLoadImage src={notFoundImg} alt="not-found" />
      </div>
    </>
  );
}
