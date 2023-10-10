import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import ComponentCover from "../ComponentCover/ComponentCover";
import { useFormik } from "formik";
import * as Yup from "yup";
import MainBtn from "../MainBtn/MainBtn";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { TokenContext } from "../../Context/TokenContext";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");
  let [loading, setLoading] = useState(false);

  let { login, setLogin, setUserName } = useContext(TokenContext);
  let headers = { token: login };

  let navigate = useNavigate();

  let baseUrl = "https://ecommerce.routemisr.com";

  let submitForm = async (values) => {
    setLoading(true);
    let { data } = await axios
      .put(`${baseUrl}/api/v1/users/changeMyPassword`, values, { headers })
      .catch((err) => setError(err.response.data.message));
    setLoading(false);
    if (data.message === "success") {
      setSuccess(data.message);
      setLogin(null);
      setUserName(null);
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Your current password is required"),
    password: Yup.string()
      .required("New password is required")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
        "Your password must contain a special character, a number,and a capital character"
      ),
    rePassword: Yup.string()
      .required("Re password is required")
      .oneOf([Yup.ref("password")], "Re password must be match your password"),
  });

  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Change Password</title>
      </Helmet>
      <ComponentCover text={"Change Password"} path={"Change Password"} />
      <div className="w-75 m-auto shadow text-center my-5 p-5">
        <h3>Change your password?</h3>
        <p className="text-muted">
          Please enter your current and new password.
        </p>
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
              Your password changed successfully please login again
            </p>
          ) : (
            ""
          )}
          <input
            type="password"
            className="form-control mb-3 rounded-0"
            placeholder="Current password"
            name="currentPassword"
            id="currentPassword"
            onChange={formik.handleChange}
            value={formik.values.currentPassword}
            onBlur={formik.handleBlur}
          />
          {formik.errors.currentPassword && formik.touched.currentPassword ? (
            <p className="alert alert-danger mt-0 rounded-0 w-100">
              {formik.errors.currentPassword}
            </p>
          ) : (
            ""
          )}
          <input
            type="password"
            className="form-control mb-3 rounded-0"
            placeholder="New password"
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
          <input
            type="password"
            className="form-control mb-3 rounded-0"
            placeholder="new password again"
            name="rePassword"
            id="rePassword"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="alert alert-danger mt-0 rounded-0 w-100">
              {formik.errors.rePassword}
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
