import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ComponentCover from "../ComponentCover/ComponentCover";
import { TokenContext } from "../../Context/TokenContext";
import { WishListContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MainBtn from "../MainBtn/MainBtn";
import { ThreeDots } from "react-loader-spinner";

import emptyCartImg from "../../Assets/preview.png";

export default function Wishlist() {
  let [btnLoading, setBtnLoading] = useState(false);

  let { login } = useContext(TokenContext);
  let {
    removeWishListProduct,
    wishListData,
    getWishListFun,
    wishListNum,
    loading,
    setProd,
    prod,
  } = useContext(WishListContext);
  let { addToCart, setCartNum } = useContext(CartContext);

  let removeWishListProductFun = async (id) => {
    let res = await removeWishListProduct(id);
    if (res.status === 200) {
      getWishListFun();
      toast.success(res.data.message);
    } else {
      toast.error(res?.response?.data.message);
    }
  };

  let addToCartFunc = async (id) => {
    setBtnLoading(true);
    let res = await addToCart(id);
    if (res.status === 200) {
      toast.success(res.data.message);
      setCartNum(res.data.numOfCartItems);
      setBtnLoading(false);
    } else {
      toast.error(res.response.data.message);
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    if (!login) return;
    getWishListFun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!login) return;
    getWishListFun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  useEffect(() => {
    if (prod) {
      localStorage.setItem("product", JSON.stringify(prod));
    }
  }, [prod]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wish list</title>
      </Helmet>
      <ComponentCover text={"Wish list"} path={"Wish list"} />
      {loading ? (
        <Loading />
      ) : (
        <div className="my-5 container">
          {wishListNum ? (
            <>
              {" "}
              <h3 className="my-4 fw-bold me-2 d-inline-block">My wishlist </h3>
              <span className="text-muted">( {wishListData.length} )</span>
              {wishListData.map((product) => (
                <div
                  className="row align-items-center  py-3 border-bottom"
                  key={product._id}
                >
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-5">
                        <LazyLoadImage
                          src={product.imageCover}
                          className="w-100"
                        />
                      </div>
                      <div className="col-md-7 p-3 d-flex flex-column justify-content-center">
                        <h5>
                          {product.title.split(" ").splice(0, 2).join(" ")}
                        </h5>
                        <p className="text-muted m-0">
                          Brand:{" "}
                          <span className="main-color">
                            {product.brand?.name}
                          </span>
                        </p>
                        <p className="text-muted m-0">
                          Category:{" "}
                          <span className="main-color">
                            {product.category?.name}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 p-2 d-flex justify-content-center">
                    <p className="m-0 text-muted">{product.price} EGP</p>
                  </div>
                  <div className="col-md-4 p-2 d-flex justify-content-center">
                    <MainBtn
                      text={
                        btnLoading ? (
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
                      id={product._id}
                    ></MainBtn>
                  </div>
                  <div className="col-md-2 p-3 d-flex justify-content-center">
                    <i
                      className="fa-solid fa-trash-can cursor-pointer"
                      onClick={() => {
                        removeWishListProductFun(product.id);
                        setProd((curr) =>
                          curr.filter((pro) => pro !== product.id)
                        );
                      }}
                    ></i>
                  </div>
                </div>
              ))}
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
