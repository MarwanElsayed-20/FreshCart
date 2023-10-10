import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { TokenContext } from "./TokenContext";

export let WishListContext = createContext(0);

export default function WishListContextProvider({ children }) {
  let [wishListNum, setWishListNum] = useState(0);
  let [prod, setProd] = useState([]);
  let [loading, setLoading] = useState(false);
  let [wishListData, setWishListData] = useState([]);

  let { login } = useContext(TokenContext);
  let headers = { token: login };

  let baseUrl = "https://ecommerce.routemisr.com";

  let addToWishList = async (productId) => {
    return axios
      .post(`${baseUrl}/api/v1/wishlist`, { productId }, { headers })
      .then((res) => res)
      .catch((err) => err);
  };

  let getWishList = async () => {
    return axios
      .get(`${baseUrl}/api/v1/wishlist`, { headers })
      .then((res) => res)
      .catch((err) => err);
  };

  let getWishListFun = async () => {
    setLoading(true);
    let res = await getWishList();
    if (res.status === 200) {
      setWishListData(res?.data.data);
      setWishListNum(res?.data.count);
      setLoading(false);
    }
    setLoading(false);
  };

  let removeWishListProduct = async (id) => {
    return axios
      .delete(`${baseUrl}/api/v1/wishlist/${id}`, { headers })
      .then((res) => res)
      .catch((err) => err);
  };

  useEffect(() => {
    if (!login) return;
    getWishListFun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!login) return;
    setProd(wishListData.map((product) => product.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishListData]);

  return (
    <WishListContext.Provider
      value={{
        addToWishList,
        getWishList,
        removeWishListProduct,
        setWishListNum,
        wishListNum,
        prod,
        setProd,
        loading,
        wishListData,
        getWishListFun,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
