import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { TokenContext } from "./TokenContext";

export let CartContext = createContext(0);

export default function CartContextProvider({ children }) {
  let [cartNum, setCartNum] = useState(0);
  let [isLoading, setIsLoading] = useState(false);
  let [cartData, setCartData] = useState([]);
  let [cartId, setCartId] = useState(0);

  let { login } = useContext(TokenContext);
  let headers = { token: login };

  let baseUrl = "https://ecommerce.routemisr.com";

  let addToCart = async (productId) => {
    return axios
      .post(`${baseUrl}/api/v1/cart`, { productId }, { headers })
      .then((res) => res)
      .catch((err) => err);
  };

  let getCart = async () => {
    return axios
      .get(`${baseUrl}/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => err);
  };

  let getCartFun = async () => {
    setIsLoading(true);
    let res = await getCart();
    if (res?.data?.status === "success") {
      setCartData(res);
      setCartNum(res?.data.numOfCartItems);
      setCartId(res?.data.data._id);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  let updateCart = async (id, count) => {
    return axios
      .put(`${baseUrl}/api/v1/cart/${id}`, { count }, { headers })
      .then((res) => res)
      .catch((err) => err);
  };

  let removeItem = async (id) => {
    return axios
      .delete(`${baseUrl}/api/v1/cart/${id}`, { headers })
      .then((res) => res)
      .catch((err) => err);
  };

  let removeCart = async () => {
    return axios
      .delete(`${baseUrl}/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => err);
  };

  let CheckOut = async (id, shippingAddress) => {
    return axios
      .post(
        `${baseUrl}/api/v1/orders/checkout-session/${id}?url=https://marwanelsayed-20.github.io/FreshCart/#`,
        { shippingAddress },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  };

  let CheckOutCash = async (id, shippingAddress) => {
    return axios
      .post(`${baseUrl}/api/v1/orders/${id}`, { shippingAddress }, { headers })
      .then((res) => res)
      .catch((err) => err);
  };

  useEffect(() => {
    if (!(login && cartData)) return;

    getCartFun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        setCartNum,
        cartNum,
        cartId,
        cartData,
        isLoading,
        getCartFun,
        removeItem,
        updateCart,
        CheckOut,
        removeCart,
        setCartData,
        CheckOutCash,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
