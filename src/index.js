import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import TokenContextProvider from "./Context/TokenContext";
import CartContextProvider from "./Context/CartContext";
import PasswordContextProvider from "./Context/PasswordContext";
import WishListContextProvider from "./Context/WishlistContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TokenContextProvider>
    <CartContextProvider>
      <WishListContextProvider>
        <QueryClientProvider client={queryClient}>
          <PasswordContextProvider>
            <App />
          </PasswordContextProvider>
        </QueryClientProvider>
      </WishListContextProvider>
    </CartContextProvider>
  </TokenContextProvider>
);

reportWebVitals();
