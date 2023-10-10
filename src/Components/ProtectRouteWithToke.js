import { Navigate } from "react-router-dom";

export default function ProtectedRouteWithToken({ children }) {
  if (!localStorage.getItem("userToken")) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
