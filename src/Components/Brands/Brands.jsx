import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ComponentCover from "../ComponentCover/ComponentCover";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../Loading/Loading";

export default function Brands() {
  let [brandsData, setBrandsData] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  let baseUrl = "https://ecommerce.routemisr.com";

  let getBrandsData = async () => {
    setIsLoading(true);
    let { data } = await axios.get(`${baseUrl}/api/v1/brands`);
    setBrandsData(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!brandsData) return;
    getBrandsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>
      <ComponentCover text={"Brands"} path={"Brands"} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container my-5">
          <h2 className="main-color text-center my-4">Brands</h2>
          <div className="row g-4">
            {brandsData.map((brand) => (
              <div
                className="col-md-3 rounded-0 position-relative"
                key={brand._id}
              >
                <div className={`card border-0 rounded-0 p-2 shadow`}>
                  <LazyLoadImage
                    src={brand.image}
                    className={`card-img-top w-100 `}
                    alt="product"
                  />
                  <div className="card-body pt-5 text-center">
                    <h4 className="main-color position-relative ">
                      {brand.name}
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
