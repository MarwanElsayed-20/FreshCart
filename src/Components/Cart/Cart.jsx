import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ComponentCover from "../ComponentCover/ComponentCover";
import { TokenContext } from "../../Context/TokenContext";
import { CartContext } from "../../Context/CartContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MainBtn from "../MainBtn/MainBtn";
import { ThreeDots } from "react-loader-spinner";
import Loading from "../Loading/Loading";

import emptyCartImg from "../../Assets/preview.png";

import style from "./cart.module.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let [updateLoading, setUpdateLoading] = useState(false);
  let [removeCartLoading, setRemoveCartLoading] = useState(false);

  let { login } = useContext(TokenContext);
  let {
    removeItem,
    updateCart,
    cartNum,
    getCartFun,
    isLoading,
    cartData,
    removeCart,
    setCartData,
    setCartNum,
  } = useContext(CartContext);

  let navigate = useNavigate();

  let updateCartFun = async (id, count) => {
    if (count !== 0) {
      setUpdateLoading(true);
      let res = await updateCart(id, count);
      setUpdateLoading(false);
      if (res.status === 200) {
        getCartFun();
        setUpdateLoading(false);
      }
    }
  };

  let removeItemFun = async (id) => {
    let res = await removeItem(id);
    if (res.status === 200) {
      getCartFun();
    }
  };

  let removeCartFun = async () => {
    setRemoveCartLoading(true);
    let res = await removeCart();
    setRemoveCartLoading(false);
    if (res.status === 200) {
      setCartData([]);
      setCartNum(0);
      getCartFun();
      setRemoveCartLoading(false);
    }
  };

  let navigateOnlineFun = () => {
    navigate("/checkout");
  };
  let navigateCashFun = () => {
    navigate("/checkoutCash");
  };
  useEffect(() => {
    if (!(login && cartData)) return;
    getCartFun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Shop Cart</title>
      </Helmet>
      <ComponentCover text={"Shop Cart"} path={"Shop Cart"} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container my-5">
          {cartNum ? (
            <>
              <div className="row">
                <div className="col-md-8">
                  <div className="div p-3">
                    <div className="row">
                      <div className="col-md-5">
                        <h4 className="m-0">Product</h4>
                      </div>
                      <div className="col-md-2 d-flex justify-content-center align-items-center">
                        <h4 className="m-0">Price</h4>
                      </div>
                      <div className="col-md-3 d-flex justify-content-center align-items-center">
                        <h4 className="m-0">Quantity</h4>
                      </div>
                      <div className="col-md-2 d-flex justify-content-center align-items-center">
                        <h4 className="m-0">Total</h4>
                      </div>
                    </div>
                    {cartData?.data?.data?.products.map((product) => (
                      <div
                        className="row py-3 my-3 border-bottom"
                        key={product._id}
                      >
                        <div className="col-md-5 d-flex justify-content-center align-items-center">
                          <div className="row">
                            <div className="col-md-4 position-relative">
                              <i
                                className={`fa-solid fa-circle-xmark position-absolute text-danger cursor-pointer ${style.position}`}
                                onClick={() => {
                                  removeItemFun(product.product._id);
                                }}
                              ></i>
                              <LazyLoadImage
                                src={product.product?.imageCover}
                                className="w-100"
                              />
                            </div>
                            <div className="col-md-8 p-3">
                              <h5>
                                {product.product?.title
                                  .split(" ")
                                  .splice(0, 2)
                                  .join(" ")}
                              </h5>
                              <p className="text-muted m-0">
                                Brand:{" "}
                                <span className="main-color">
                                  {product.product?.brand?.name}
                                </span>
                              </p>
                              <p className="text-muted m-0">
                                Category:{" "}
                                <span className="main-color">
                                  {product.product?.category?.name}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center align-items-center">
                          <p className="m-0 text-muted">{product.price} EGP</p>
                        </div>
                        <div className="col-md-3 d-flex justify-content-center align-items-center">
                          {updateLoading ? (
                            <ThreeDots
                              height="20"
                              width="20"
                              radius="9"
                              color="#212529bf"
                              ariaLabel="three-dots-loading"
                              wrapperStyle={{}}
                              wrapperClassName=""
                              visible={true}
                            />
                          ) : (
                            <>
                              <p className="m-0 text-muted background-color p-3">
                                <span
                                  onClick={() => {
                                    updateCartFun(
                                      product.product._id,
                                      product.count - 1
                                    );
                                  }}
                                >
                                  <i className="fa-solid fa-minus me-4 cursor-pointer"></i>
                                </span>
                                {product.count}
                                <span
                                  onClick={() => {
                                    updateCartFun(
                                      product.product._id,
                                      product.count + 1
                                    );
                                  }}
                                >
                                  <i className="fa-solid fa-plus ms-4 cursor-pointer"></i>
                                </span>
                              </p>
                            </>
                          )}
                        </div>
                        <div className="col-md-2 d-flex justify-content-center align-items-center">
                          <p className="m-0 text-muted">
                            {Math.round(product.price * product.count)} EGP
                          </p>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="btn btn-danger w-100 rounded-0 my-3 d-flex justify-content-center align-items-center"
                      onClick={() => {
                        removeCartFun();
                      }}
                    >
                      {removeCartLoading ? (
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
                        "Clear cart"
                      )}
                    </button>
                  </div>
                </div>
                <div className="col-md-4 p-3">
                  <h4 className="m-0 text-center">Cart totals</h4>
                  <div className="p-4 my-3 background-color">
                    <div className="p-2 border-bottom d-flex justify-content-between align-items-center">
                      <p className="m-0">Number of cart items:</p>
                      <p className="m-0">{cartData.data?.numOfCartItems}</p>
                    </div>
                    <div className="p-2 my-4 border-bottom d-flex justify-content-between align-items-center">
                      <p className="m-0">Total:</p>
                      <p className="m-0">
                        {cartData.data?.data?.totalCartPrice} EGP
                      </p>
                    </div>
                    <p className="text-muted text-center my-4">
                      <i className="fa-solid fa-circle-check main-color fa-sm"></i>{" "}
                      Shipping & taxes calculated at checkout
                    </p>
                    <div className="mb-3">
                      <MainBtn
                        text={"Proceed to checkout ( Online )"}
                        width={"w-100"}
                        type={"submit"}
                        fun={navigateOnlineFun}
                      />
                    </div>
                    <div>
                      <MainBtn
                        text={"Proceed to checkout ( Cash )"}
                        width={"w-100"}
                        type={"submit"}
                        fun={navigateCashFun}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <LazyLoadImage
              src={emptyCartImg}
              alt="empty-cart"
              className="w-100"
            />
          )}
        </div>
      )}
    </>
  );
}
