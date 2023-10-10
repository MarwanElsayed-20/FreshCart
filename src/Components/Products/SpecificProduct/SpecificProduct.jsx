import axios from "axios";
import React, { useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import MainBtn from "../../MainBtn/MainBtn";
import Loading from "../../Loading/Loading";
import ComponentCover from "../../ComponentCover/ComponentCover";
import { CartContext } from "../../../Context/CartContext";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export default function SpecificProduct() {
  let [loading, setLoading] = useState(false);

  let { addToCart, setCartNum } = useContext(CartContext);

  let { id } = useParams();

  let baseUrl = "https://ecommerce.routemisr.com";

  let query = useQuery("specificProduct", () => {
    return axios.get(`${baseUrl}/api/v1/products/${id}`);
  });

  let { data, isLoading } = query;

  let addToCartFunc = async (id) => {
    setLoading(true);
    let res = await addToCart(id);
    if (res.status === 200) {
      toast.success(res.data.message);
      setCartNum(res.data.numOfCartItems);
      setLoading(false);
    } else {
      toast.error(res.response.data.message);
      setLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ComponentCover text={"Product Details"} path={"Product Details"} />
          <div className="my-5">
            <div className="container">
              <div>
                <div className="row shadow p-3">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-3 d-flex justify-content-between flex-column">
                        {data?.data?.data.images.splice(0, 3).map((img) => (
                          <LazyLoadImage
                            key={img}
                            src={img}
                            alt="product-img"
                            className="w-100 "
                          />
                        ))}
                      </div>
                      <div className="col-md-9">
                        <LazyLoadImage
                          src={data?.data?.data.imageCover}
                          alt="product-img"
                          className="w-100"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 p-3 d-flex justify-content-center flex-column">
                    <h3 className="fw-bold">{data?.data?.data?.title}</h3>
                    <p>
                      <i className="fa-solid fa-star text-warning me-2"></i>
                      {`( ${data?.data?.data?.ratingsAverage} )`}
                    </p>
                    <p>
                      Price:
                      <span className="main-color ms-2">
                        {data?.data?.data?.price} EGP
                      </span>
                    </p>
                    <p className="text-muted">
                      {data?.data?.data?.description}
                    </p>
                    <MainBtn
                      text={
                        loading ? (
                          <ThreeDots
                            height="30"
                            width="80"
                            radius="9"
                            color="#212529bf"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                          />
                        ) : (
                          `Add to cart`
                        )
                      }
                      fun={addToCartFunc}
                      id={data?.data?.data?._id}
                    ></MainBtn>
                    <ul className="list-unstyled my-4">
                      <li>
                        Category:
                        <span className="main-color ms-2">
                          {data?.data?.data?.category?.name}
                        </span>
                      </li>
                      <li>
                        Brand:
                        <span className="main-color ms-2">
                          {data?.data?.data?.brand?.name}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
