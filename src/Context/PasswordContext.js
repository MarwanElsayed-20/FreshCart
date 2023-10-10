import axios from "axios";
import React, { createContext, useState } from "react";

export let PasswordContext = createContext(0);

export default function PasswordContextProvider({ children }) {
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");
  let [reset, setReset] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  let baseUrl = "https://ecommerce.routemisr.com";

  let forgotPasswordFun = async (values) => {
    setLoading(true);
    let { data } = await axios
      .post(`${baseUrl}/api/v1/auth/forgotPasswords`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });

    if (data.statusMsg === "success") {
      setError("");
      setSuccess(data.message);
      setTimeout(() => {
        setReset(true);
        setOpen(true);
      }, 3000);

      setLoading(false);
    }
  };

  return (
    <PasswordContext.Provider
      value={{
        forgotPasswordFun,
        open,
        reset,
        success,
        error,
        loading,
        handleClose,
        setOpen,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
}
