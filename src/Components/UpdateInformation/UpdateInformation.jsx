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

export default function UpdateInformation() {
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
      .put(`${baseUrl}/api/v1/users/updateMe/`, values, { headers })
      .catch((err) => {
        setError(err.response.data.errors.msg);
        setLoading(false);
      });

    if (data.message === "success") {
      setError("");
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
    name: Yup.string()
      .required("Name is required")
      .min(3, "Minimum length is 5 characters")
      .max(10, "Max length is 10 characters")
      .matches(/^[a-zA-Z]+$/, "Your name should only contain characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid")
      .matches(
        /([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))/,
        "your email must be a valid and real email"
      ),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^01[0-2,5]\d{8}$/,
        "Your phone must start with 010 / 011 / 012 / 015 and must be 11 numbers"
      ),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Update User Information</title>
      </Helmet>
      <ComponentCover
        text={"Update User Information"}
        path={"Update User Information"}
      />
      <div className="w-75 m-auto shadow text-center my-5 p-5">
        <h3>Update your information?</h3>
        <p className="text-muted">Please fill the details bellow.</p>
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
              Your information updated successfully please login again
            </p>
          ) : (
            ""
          )}
          <input
            type="text"
            className="form-control mb-3 rounded-0"
            placeholder="Enter your new name"
            name="name"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <p className="alert alert-danger mt-0 rounded-0 w-100">
              {formik.errors.name}
            </p>
          ) : (
            ""
          )}
          <input
            type="email"
            className="form-control mb-3 rounded-0"
            placeholder="Enter your new email"
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
            type="tele"
            className="form-control mb-3 rounded-0"
            placeholder="Enter your new phone"
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
