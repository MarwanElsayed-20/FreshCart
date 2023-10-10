import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../Context/CartContext";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import ComponentCover from "../../ComponentCover/ComponentCover";
import * as Yup from "yup";
import MainBtn from "../../MainBtn/MainBtn";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../../Context/TokenContext";

export default function Checkout() {
  let [loading, setLoading] = useState(false);
  let [success, setSuccess] = useState(false);

  let { cartData, setCartData, CheckOutCash, getCartFun, setCartNum, cartId } =
    useContext(CartContext);
  let { login } = useContext(TokenContext);

  let navigate = useNavigate();

  let submitForm = async (values) => {
    setLoading(true);
    let res = await CheckOutCash(cartId, values);
    console.log(res);
    if (res.data.status === "success") {
      setSuccess(res.status);
      setCartNum(0);
      setCartData([]);
      setTimeout(() => {
        navigate("/allOrders");
        window.location.reload();
        setSuccess(false);
      }, 5000);
      setLoading(false);
    }
    setLoading(false);
  };

  const validationSchema = Yup.object({
    details: Yup.string()
      .required("Address details is required")
      .min(10, "Minimum address details must be 10"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^01[0-2,5]\d{8}$/,
        "Your phone must start with 010 / 011 / 012 / 015 and must be 11 numbers"
      ),
    city: Yup.string()
      .required("City is required")
      .matches(
        /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
        "City name should contain only characters"
      ),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });

  useEffect(() => {
    if (!(login && cartData)) return;
    getCartFun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout - Cash</title>
      </Helmet>
      <ComponentCover text={"Checkout - Cash"} path={"Checkout - Cash"} />
      <div className="container my-5">
        {success ? (
          <p className="alert alert-success rounded-0 w-100">
            Your order is completed.
          </p>
        ) : (
          <>
            {" "}
            <h3>Checkout details</h3>
            <p className="text-muted mb-5">Please fill the details bellow.</p>
            <form onSubmit={formik.handleSubmit} action="">
              <div className="row">
                <div className="col-md-8 background-color p-5">
                  <h4 className="my-4">Shipping address</h4>
                  <input
                    type="text"
                    className="form-control mb-3 rounded-0"
                    placeholder="Address details"
                    name="details"
                    id="details"
                    onChange={formik.handleChange}
                    value={formik.values.details}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.details && formik.touched.details ? (
                    <p className="alert alert-danger mt-0 rounded-0 w-100">
                      {formik.errors.details}
                    </p>
                  ) : (
                    ""
                  )}
                  <input
                    type="tele"
                    className="form-control mb-3 rounded-0"
                    placeholder="Phone"
                    name="phone"
                    id="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <p className="alert alert-danger mt-0 rounded-0 w-100">
                      {formik.errors.phone}
                    </p>
                  ) : (
                    ""
                  )}
                  <input
                    type="text"
                    className="form-control mb-3 rounded-0"
                    placeholder="City"
                    name="city"
                    id="city"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.city && formik.touched.city ? (
                    <p className="alert alert-danger mt-0 rounded-0 w-100">
                      {formik.errors.city}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="col-md-4">
                  <div className="p-4 background-color h-100 d-flex flex-column justify-content-center">
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
                          "Proceed to checkout"
                        )
                      }
                      width={"w-100"}
                      type={"submit"}
                    />
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
