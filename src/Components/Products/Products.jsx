import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context/ProductsContext";
import { Helmet } from "react-helmet";
import ComponentCover from "../ComponentCover/ComponentCover";
import Loading from "../Loading/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TokenContext } from "../../Context/TokenContext";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { WishListContext } from "../../Context/WishlistContext";

export default function Products() {
  let [sort, setSort] = useState(false);
  let [loading, setLoading] = useState(false);
  let [wishLoading, setWishLoading] = useState(false);

  let { data, isLoading } = useContext(ProductContext);
  let { login } = useContext(TokenContext);
  let { addToCart, setCartNum } = useContext(CartContext);
  let { addToWishList, removeWishListProduct, setWishListNum, prod, setProd } =
    useContext(WishListContext);

  let addToWishListFun = async (productId) => {
    setWishLoading(true);
    let res = await addToWishList(productId);
    setWishLoading(false);
    if (res.status === 200) {
      toast.success(res.data.message);
      setWishListNum(res?.data.data.length);
      setWishLoading(false);
    } else {
      toast.error(res?.response?.data.message);
      setWishLoading(false);
    }
  };

  let removeWishListProductFun = async (id) => {
    setWishLoading(true);
    let res = await removeWishListProduct(id);
    setWishLoading(false);
    if (res.status === 200) {
      toast.success(res.data.message);
      setWishListNum(res?.data.data.length);
      setWishLoading(false);
    } else {
      toast.error(res.response.data.message);
      setWishLoading(false);
    }
  };

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

  useEffect(() => {
    if (localStorage.getItem("product")) {
      setProd(JSON.parse(localStorage.getItem("product")));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (prod) {
      localStorage.setItem("product", JSON.stringify(prod));
    }
  }, [prod]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <ComponentCover text={"Products"} path={"Products"} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="my-5 py-5">
          <div className="container text-center py-5">
            <div className="title-info d-flex justify-content-between align-items-center">
              <div className="title d-flex flex-column align-items-start">
                <h2 className="main-color ">All Products</h2>
                <p className="text-muted">About {data.data.results} results</p>
              </div>
              <p className="text-muted">
                Sort by price:
                <button
                  className="border-0 rounded-0 p-3 main-bg-color text-white ms-3"
                  onClick={() => {
                    setSort((current) => !current);
                  }}
                >
                  {sort ? (
                    <i className="fa-solid fa-arrow-up-short-wide"></i>
                  ) : (
                    <i className="fa-solid fa-arrow-up-wide-short"></i>
                  )}
                </button>
              </p>
            </div>
            {data?.data?.data
              ?.sort((a, b) => {
                if (sort) {
                  return a.price - b.price;
                } else {
                  return b.price - a.price;
                }
              })
              .map((product) => (
                <div
                  className="shadow my-5 p-3 cursor-pointer single-product"
                  key={product._id}
                >
                  <div className="row">
                    <div className="col-md-4">
                      <Link to={`/specificProduct/${product.id}`}>
                        <LazyLoadImage
                          src={product.imageCover}
                          className="w-100"
                        />
                      </Link>
                    </div>
                    <div className="col-md-8 d-flex justify-content-center flex-column align-items-start p-5 text-start">
                      <Link to={`/specificProduct/${product.id}`}>
                        <h3 className="text-black">{product.title}</h3>
                        <p className="text-black price">
                          Price:{" "}
                          <span className="main-color">
                            {product.price} EGP
                          </span>{" "}
                        </p>
                        <p className="text-muted">
                          <i className="fa-solid fa-star text-warning me-2"></i>
                          {`( ${product.ratingsAverage} )`}
                        </p>
                        <p className="text-start text-muted">
                          {product.description}
                        </p>
                      </Link>
                      {login ? (
                        <ul className="list-unstyled d-flex align-items-center ">
                          <li
                            className="proBtn rounded-circle shadow d-flex align-items-center justify-content-center me-3 cursor-pointer main-color"
                            onClick={(e) => {
                              addToCartFunc(product._id);
                            }}
                          >
                            {loading ? (
                              <ThreeDots
                                height="30"
                                width="30"
                                radius="9"
                                color="#212529bf"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                              />
                            ) : (
                              <i className="fa-solid fa-cart-shopping"></i>
                            )}
                          </li>
                          {prod.includes(product.id) ? (
                            <li
                              className="proBtn rounded-circle shadow d-flex align-items-center justify-content-center cursor-pointer main-color  bg-danger text-white"
                              onClick={() => {
                                removeWishListProductFun(product.id);
                                setProd((curr) =>
                                  curr.filter((pro) => pro !== product.id)
                                );
                                console.log(prod);
                              }}
                            >
                              {/* <li
                                className={`${style.iconStyle} cursor-pointer bg-danger`}
                                onClick={() => {
                                  removeWishListProductFun(product.id);
                                  setProd((curr) =>
                                    curr.filter((pro) => pro !== product.id)
                                  );
                                  console.log(prod);
                                }}
                              > */}
                              {wishLoading ? (
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
                                <i className="fa-solid fa-heart "></i>
                              )}
                            </li>
                          ) : (
                            <li
                              className="proBtn rounded-circle shadow d-flex align-items-center justify-content-center cursor-pointer main-color"
                              onClick={() => {
                                setProd([...prod, product.id]);
                                addToWishListFun(product.id);
                                console.log(prod);
                                localStorage.setItem(
                                  "product",
                                  JSON.stringify(prod)
                                );
                              }}
                            >
                              {/* <li
                              className={`${style.iconStyle} cursor-pointer`}
                              onClick={() => {
                                setProd([...prod, product.id]);
                                addToWishListFun(product.id);
                                console.log(prod);
                                localStorage.setItem(
                                  "product",
                                  JSON.stringify(prod)
                                );
                              }}
                            > */}
                              {wishLoading ? (
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
                                <i className="fa-regular fa-heart"></i>
                              )}
                            </li>
                          )}
                          {/* <li className="proBtn rounded-circle shadow d-flex align-items-center justify-content-center cursor-pointer main-color">
                            <i className="fa-solid fa-heart "></i>
                          </li> */}
                        </ul>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
