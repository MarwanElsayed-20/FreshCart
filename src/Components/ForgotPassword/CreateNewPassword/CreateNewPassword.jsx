import React, { useState } from "react";
import { Helmet } from "react-helmet";
import ComponentCover from "../../ComponentCover/ComponentCover";
import { useFormik } from "formik";
import * as Yup from "yup";
import MainBtn from "../../MainBtn/MainBtn";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateNewPassword() {
  let [error, setError] = useState("");
  let [success, setSuccess] = useState(false);
  let [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  let baseUrl = "https://ecommerce.routemisr.com";

  let submitForm = async (values) => {
    setLoading(true);
    let { data } = await axios
      .put(`${baseUrl}/api/v1/auth/resetPassword`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
    if (data.token) {
      setError("");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 3000);

      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    newPassword: Yup.string()
      .required("New password is required")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
        "Your password must contain a special character, a number,and a capital character"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Create New Password</title>
      </Helmet>
      <ComponentCover
        text={"Create new password"}
        path={"Create new password"}
      />
      <div className="w-75 m-auto shadow text-center my-5 p-5">
        <h3>Create New Password</h3>
        <p className="text-muted">Please create new password</p>
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
            <p className="alert alert-success rounded-0 w-100">
              Your Password changed successfully.
            </p>
          ) : (
            ""
          )}
          <input
            type="email"
            className="form-control mb-3 rounded-0"
            placeholder="Your email"
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
            placeholder="New password"
            name="newPassword"
            id="newPassword"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <p className="alert alert-danger mt-0 rounded-0 w-100">
              {formik.errors.newPassword}
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
      </div>
    </>
  );
}
