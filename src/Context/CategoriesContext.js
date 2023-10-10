import axios from "axios";
import { createContext } from "react";
import { useQuery } from "react-query";

export let CategoriesContext = createContext(0);

export default function CategoriesContextProvider({ children }) {
  let baseUrl = "https://ecommerce.routemisr.com";

  let query = useQuery("categories", () => {
    return axios.get(`${baseUrl}/api/v1/categories`);
  });
  let { data } = query;

  return (
    <CategoriesContext.Provider value={{ data }}>
      {children}
    </CategoriesContext.Provider>
  );
}
