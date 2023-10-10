import Modal from "@mui/material/Modal";
import React, { useContext, useState } from "react";
import { PasswordContext } from "../../../Context/PasswordContext";
import { useFormik } from "formik";
import axios from "axios";
import { Box } from "@mui/material";
import MainBtn from "../../MainBtn/MainBtn";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function ResetCode() {
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");
  let [loading, setLoading] = useState(false);

  let { open, handleClose, setOpen } = useContext(PasswordContext);

  let navigate = useNavigate();

  let baseUrl = "https://ecommerce.routemisr.com";

  let submitForm = async (values) => {
    setLoading(true);
    let { data } = await axios
      .post(`${baseUrl}/api/v1/auth/verifyResetCode`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
        console.log(data);
      });
    if (data.status === "Success") {
      setError("");
      setSuccess(data.status);
      setTimeout(() => {
        setOpen(false);
        navigate("/CreateNewPassword");
      }, 2000);
      setLoading(false);
      console.log(data);
    }
    console.log(data);
  };

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: submitForm,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-100 p-5 m-0 shadow text-center bg-white">
            <p className="text-muted m-0">Please enter the reset code.</p>
            <p className="text-muted">
              The reset code will expire in 10 minutes
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
                  {success}{" "}
                  <span className="d-block">
                    Please wait, we will redirect you.
                  </span>
                </p>
              ) : (
                ""
              )}
              <input
                type="text"
                className="form-control mb-3 rounded-0"
                placeholder="Reset code"
                name="resetCode"
                id="resetCode"
                onChange={formik.handleChange}
                value={formik.values.resetCode}
                onBlur={formik.handleBlur}
              />
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
        </Box>
      </Modal>
    </>
  );
}
