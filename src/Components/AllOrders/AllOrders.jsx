import React from "react";
import jwt_decode from "jwt-decode";
import { useQuery } from "react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import ComponentCover from "../ComponentCover/ComponentCover";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MainBtn from "../MainBtn/MainBtn";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function AllOrders() {
  var token = localStorage.getItem("userToken");
  var decoded = jwt_decode(token);
  let userId = decoded.id;

  let navigate = useNavigate();

  let navigateHome = () => {
    navigate("/");
  };

  let baseUrl = "https://ecommerce.routemisr.com";

  let query = useQuery("orders", () => {
    return axios.get(`${baseUrl}/api/v1/orders/user/${userId}`);
  });

  let { data, isLoading } = query;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>User Orders</title>
      </Helmet>
      <ComponentCover text={"User Orders"} path={"User Orders"} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container my-5">
          {data?.data.length ? (
            <>
              <h3 className="d-inline-block me-3 fw-bold">User Orders</h3>
              <span className="text-muted">({data?.data?.length})</span>
              {data?.data?.map((order) => (
                <div className="shadow my-5 p-5" key={order._id}>
                  <div className="border-bottom">
                    <h4>Order ID: {order.id}</h4>
                    <p className="text-muted">
                      Crated At: {order.createdAt.slice(0, 10)}{" "}
                      {order.createdAt.slice(11, 16)}
                    </p>
                    <p className="main-color text-capitalize">
                      {order.paymentMethodType}
                    </p>
                  </div>
                  <div className="border-bottom py-4">
                    {order.cartItems.map((item) => (
                      <div className="row my-3" key={item._id}>
                        <div className="col-md-2">
                          <LazyLoadImage
                            src={item.product?.imageCover}
                            className="w-75"
                          />
                        </div>
                        <div className="col-md-6 p-3 d-flex flex-column justify-content-center">
                          <h5>{item.product?.title}</h5>
                          <p className="text-muted m-0">
                            Brand:{" "}
                            <span className="main-color">
                              {item.product?.brand?.name}
                            </span>
                          </p>
                          <p className="text-muted m-0">
                            Category:{" "}
                            <span className="main-color">
                              {item.product?.category?.name}
                            </span>
                          </p>
                        </div>
                        <div className="col-md-4 d-flex flex-column justify-content-center align-items-end">
                          <p className="fw-bold fs-4 m-0">{item.price} EGP</p>
                          <p className="text-muted">Quantity: {item.count}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 d-flex justify-content-between ">
                    <div>
                      <h4>Delivery</h4>
                      <p className="text-muted">Address</p>
                      <ul className="list-unstyled main-color">
                        <li>{order.shippingAddress?.details}</li>
                        <li>{order.shippingAddress?.city}</li>
                        <li>{order.shippingAddress?.phone}</li>
                      </ul>
                    </div>
                    <div className="text-center">
                      <h4 className="fw-bold">Total price</h4>
                      <p className="text-muted">{order.totalOrderPrice} EGP</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center shadow p-5">
              <h4 className="fw-bold">You have no orders yet</h4>
              <p className="text-muted">Want to order?</p>
              <MainBtn
                text={"Go shopping"}
                width={"w-100"}
                type={"submit"}
                fun={navigateHome}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
