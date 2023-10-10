import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import ComponentCover from "../ComponentCover/ComponentCover";
import { useFormik } from "formik";
import * as Yup from "yup";
import MainBtn from "../MainBtn/MainBtn";
import { ThreeDots } from "react-loader-spinner";
import { PasswordContext } from "../../Context/PasswordContext";
import ResetCode from "./ResetCode/ResetCode";

export default function ForgotPassword() {
  let { forgotPasswordFun, reset, success, error, loading } =
    useContext(PasswordContext);

  let submitForm = async (values) => {
    await forgotPasswordFun(values);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forgot Password</title>
      </Helmet>
      <ComponentCover text={"Forgot Password"} path={"Forgot Password"} />
      <div className="w-75 m-auto shadow text-center my-5 p-5">
        <h3>Forgot your password?</h3>
        <p className="text-muted">Please enter your email.</p>
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
          {success ? (
            <p className="alert alert-success rounded-0 w-100">{success}</p>
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
                "Submit"
              )
            }
            width={"w-100"}
            type={"submit"}
          />
        </form>
        {reset ? <ResetCode /> : ""}
      </div>
    </>
  );
}
