import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ComponentCover from "../ComponentCover/ComponentCover";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../Loading/Loading";

export default function Categories() {
  let [categData, setCategData] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  let baseUrl = "https://ecommerce.routemisr.com";

  let getBrandsData = async () => {
    setIsLoading(true);
    let { data } = await axios.get(`${baseUrl}/api/v1/categories`);
    setCategData(data.data);
    setIsLoading(false);
  };


  useEffect(() => {
    if (!categData) return;
    getBrandsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
      <ComponentCover text={"Categories"} path={"Categories"} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container my-5">
          <h2 className="main-color text-center my-4">Categories</h2>
          <div className="row g-4">
            {categData.map((cat) => (
              <div
                className="col-md-3 rounded-0 position-relative"
                key={cat._id}
              >
                <div className={`card border-0 rounded-0 p-2 shadow`}>
                  <LazyLoadImage
                    src={cat.image}
                    className={`card-img-top w-100`}
                    alt="product"
                    height={400}
                  />
                  <div className="card-body pt-5 text-center">
                    <h4 className="main-color position-relative ">
                      {cat.name}
                    </h4>
                    <div className={`m-auto mb-3 w-25 `}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}{" "}
    </>
  );
}
