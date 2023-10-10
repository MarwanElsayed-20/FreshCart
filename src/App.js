import {
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Layout from "./Components/Layout";
import Home from "./Components/Home/Home";
import Loading from "./Components/Loading/Loading";
import CategoriesContextProvider from "./Context/CategoriesContext";
import ProductContextProvider from "./Context/ProductsContext";
import ProtectedRouteWithToken from "./Components/ProtectRouteWithToke";
import ProtectedRouteWithoutToken from "./Components/ProtectRouteWithoutToken";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import UpdateInformation from "./Components/UpdateInformation/UpdateInformation";
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/Checkout/Checkout";
import AllOrders from "./Components/AllOrders/AllOrders";
import CheckoutCash from "./Components/Checkout/CheckoutCash/CheckoutCash";

const Login = lazy(() => import("./Components/Login/Login"));
const Register = lazy(() => import("./Components/Register/Register"));
const ForgotPassword = lazy(() =>
  import("./Components/ForgotPassword/ForgotPassword")
);
const CreateNewPassword = lazy(() =>
  import("./Components/ForgotPassword/CreateNewPassword/CreateNewPassword")
);
const Wishlist = lazy(() => import("./Components/Wishlist/Wishlist"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const Products = lazy(() => import("./Components/Products/Products"));
const SpecificProduct = lazy(() =>
  import("./Components/Products/SpecificProduct/SpecificProduct")
);
const Categories = lazy(() => import("./Components/Categories/Categories"));
const Brands = lazy(() => import("./Components/Brands/Brands"));
const NotFound = lazy(() => import("./Components/NotFound/NotFound"));

function App() {
  const routes = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <ProductContextProvider>
                <CategoriesContextProvider>
                  <Home />
                </CategoriesContextProvider>
              </ProductContextProvider>
            </Suspense>
          ),
        },
        {
          path: "/login",
          element: (
            <ProtectedRouteWithoutToken>
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            </ProtectedRouteWithoutToken>
          ),
        },
        {
          path: "/register",
          element: (
            <ProtectedRouteWithoutToken>
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            </ProtectedRouteWithoutToken>
          ),
        },
        {
          path: "/forgotPassword",
          element: (
            <ProtectedRouteWithoutToken>
              <Suspense fallback={<Loading />}>
                <ForgotPassword />
              </Suspense>
            </ProtectedRouteWithoutToken>
          ),
        },
        {
          path: "/createNewPassword",
          element: (
            <ProtectedRouteWithoutToken>
              <Suspense fallback={<Loading />}>
                <CreateNewPassword />
              </Suspense>
            </ProtectedRouteWithoutToken>
          ),
        },
        {
          path: "/changePassword",
          element: (
            <ProtectedRouteWithToken>
              <Suspense fallback={<Loading />}>
                <ChangePassword />
              </Suspense>
            </ProtectedRouteWithToken>
          ),
        },
        {
          path: "/updateInformation",
          element: (
            <ProtectedRouteWithToken>
              <Suspense fallback={<Loading />}>
                <UpdateInformation />
              </Suspense>
            </ProtectedRouteWithToken>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRouteWithToken>
              <Suspense fallback={<Loading />}>
                <Wishlist />
              </Suspense>
            </ProtectedRouteWithToken>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRouteWithToken>
              <Suspense fallback={<Loading />}>
                <Cart />
              </Suspense>
            </ProtectedRouteWithToken>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRouteWithToken>
              <Suspense fallback={<Loading />}>
                <Checkout />
              </Suspense>
            </ProtectedRouteWithToken>
          ),
        },
        {
          path: "/checkoutCash",
          element: (
            <ProtectedRouteWithToken>
              <Suspense fallback={<Loading />}>
                <CheckoutCash />
              </Suspense>
            </ProtectedRouteWithToken>
          ),
        },
        {
          path: "/allOrders",
          element: (
            <ProtectedRouteWithToken>
              <Suspense fallback={<Loading />}>
                <AllOrders />
              </Suspense>
            </ProtectedRouteWithToken>
          ),
        },
        {
          path: "/products",
          element: (
            <Suspense fallback={<Loading />}>
              <ProductContextProvider>
                <Products />
              </ProductContextProvider>
            </Suspense>
          ),
        },
        {
          path: "/specificProduct/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <ProductContextProvider>
                <SpecificProduct />
              </ProductContextProvider>
            </Suspense>
          ),
        },
        {
          path: "/categories",
          element: (
            <Suspense fallback={<Loading />}>
              <CategoriesContextProvider>
                <Categories />
              </CategoriesContextProvider>
            </Suspense>
          ),
        },
        {
          path: "/brands",
          element: (
            <Suspense fallback={<Loading />}>
              <Brands />
            </Suspense>
          ),
        },
        {
          path: "/*",
          element: (
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
