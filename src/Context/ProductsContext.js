import axios from "axios";
import { createContext } from "react";
import { useQuery } from "react-query";

export let ProductContext = createContext(0);

export default function ProductContextProvider({ children }) {
  let baseUrl = "https://ecommerce.routemisr.com";

  let query = useQuery("products", () => {
    return axios.get(`${baseUrl}/api/v1/products`);
  });

  let { data, isLoading } = query;

  return (
    <ProductContext.Provider value={{ data, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
}
