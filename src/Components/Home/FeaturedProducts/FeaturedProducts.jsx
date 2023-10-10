import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../Context/ProductsContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import style from "./featured-product.module.css";
import Loading from "../../Loading/Loading";
import { Link } from "react-router-dom";
import { TokenContext } from "../../../Context/TokenContext";
import { CartContext } from "../../../Context/CartContext";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { WishListContext } from "../../../Context/WishlistContext";
import MainBtn from "../../MainBtn/MainBtn";

export default function FeaturedProducts() {
  let [loading, setLoading] = useState(false);
  let [wishLoading, setWishLoading] = useState(false);
  let [productNum, setProductNum] = useState(8);
  let [flag, setFlag] = useState(false);

  let { login } = useContext(TokenContext);
  let { data, isLoading } = useContext(ProductContext);
  let { addToCart, setCartNum } = useContext(CartContext);

  let { addToWishList, removeWishListProduct, setWishListNum, prod, setProd } =
    useContext(WishListContext);

  let productNumFun = () => {
    if (productNum < data?.data?.data.length) {
      setFlag(false);
      setProductNum(productNum + 8);
    } else {
      setFlag(true);
    }
  };

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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="my-5 py-5">
          <div className="container text-center py-5">
            <h2 className="main-color pb-4">Featured Products</h2>
            <div className="row gy-4">
              {data?.data?.data
                ?.sort((a, b) => b.sold - a.sold)
                .slice(0, productNum)
                .map((product) => (
                  <div
                    className="col-md-3  rounded-0 position-relative"
                    key={product._id}
                  >
                    <div
                      className={`card border-0 rounded-0 p-2 ${style.minHeight} ${style.shadow}`}
                    >
                      <div
                        className={`card-info position-absolute ${style.position}`}
                      >
                        {login ? (
                          <ul className="list-unstyled d-flex align-items-center">
                            <li
                              className={`me-2 ${style.iconStyle} z-1 cursor-pointer`}
                              onClick={() => {
                                addToCartFunc(product._id);
                              }}
                            >
                              {loading ? (
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
                                <i className="fa-solid fa-cart-shopping"></i>
                              )}
                            </li>
                            {prod.includes(product.id) ? (
                              <li
                                className={`${style.iconStyle} cursor-pointer bg-danger`}
                                onClick={() => {
                                  removeWishListProductFun(product.id);
                                  setProd((curr) =>
                                    curr.filter((pro) => pro !== product.id)
                                  );
                                }}
                              >
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
                                className={`${style.iconStyle} cursor-pointer`}
                                onClick={() => {
                                  setProd([...prod, product.id]);
                                  addToWishListFun(product.id);
                                  localStorage.setItem(
                                    "product",
                                    JSON.stringify(prod)
                                  );
                                }}
                              >
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
                          </ul>
                        ) : (
                          ""
                        )}
                      </div>
                      <Link to={`specificProduct/${product._id}`}>
                        <LazyLoadImage
                          src={product.imageCover}
                          className={`card-img-top w-100 ${style.prodImg} cursor-pointer`}
                          alt="product"
                        />
                      </Link>
                      <div className="card-body pt-5 text-center">
                        <Link to={`specificProduct/${product._id}`}>
                          <h4 className="main-color position-relative cursor-pointer">
                            {product.title.split(" ").splice(0, 2).join(" ")}
                          </h4>
                          <div
                            className={`${style.underLine} m-auto mb-3 w-25 cursor-pointer`}
                          ></div>
                        </Link>
                        <ul className="list-unstyled">
                          <li>Category - {product.category.name}</li>
                          <li>Price - {product.price} EGP</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              {flag ? (
                <button className="btn btn-dark">No More products</button>
              ) : (
                <MainBtn text={"More"} type={"submit"} fun={productNumFun} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
