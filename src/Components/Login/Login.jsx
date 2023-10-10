import React, { useContext, useEffect, useState } from "react";
import ComponentCover from "../ComponentCover/ComponentCover";
import { Link, useNavigate } from "react-router-dom";
import MainBtn from "../MainBtn/MainBtn";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TokenContext } from "../../Context/TokenContext";
import { ThreeDots } from "react-loader-spinner";

export default function Login() {
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");

  let { login, setLogin, setUserName } = useContext(TokenContext);

  let navigate = useNavigate();
  let baseUrl = "https://ecommerce.routemisr.com";

  let submitForm = async (values) => {
    setLoading(true);
    let { data } = await axios
      .post(`${baseUrl}/api/v1/auth/signin`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });

    if (data.message === "success") {
      window.location.reload();
      setError("");
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userName", data.user.name);
      setLogin(data.token);
      setUserName(data.user.name);
      navigate("/");
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string().required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });

  useEffect(() => {
    if (!login) return;
  }, [login]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <ComponentCover text={"My Account"} path={"Login"} />
      <div className="w-75 m-auto shadow text-center my-5 p-5">
        <h3>Login</h3>
        <p className="text-muted">Please login using account details bellow.</p>
        <form
          onSubmit={formik.handleSubmit}
          action=""
          className="d-flex justify-content-center align-items-center flex-column"
        >
          {error ? (
            <p className="alert alert-danger rounded-0 w-100">{error}.</p>
          ) : (
            ""
          )}
          <input
            type="email"
            className="form-control mb-3 rounded-0"
            placeholder="Email address"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="alert alert-danger mt-0 rounded-0 w-100">
              {formik.errors.email}
            </p>
          ) : (
            ""
          )}
          <input
            type="password"
            className="form-control mb-3 rounded-0"
            placeholder="Password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="alert alert-danger mt-0 rounded-0 w-100">
              {formik.errors.password}
            </p>
          ) : (
            ""
          )}
          <Link to="/forgotPassword" className="mb-3 text-muted login">
            Forgot your password?
          </Link>
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
                "Login"
              )
            }
            width={"w-100"}
            type={"submit"}
          />
          <Link to="/register" className="mt-3 text-muted login">
            Don't have an account? Create account.
          </Link>
        </form>
      </div>
    </>
  );
}
