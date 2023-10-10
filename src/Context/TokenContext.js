import { createContext, useState } from "react";

export let TokenContext = createContext("");

export default function TokenContextProvider({ children }) {
  let [login, setLogin] = useState(localStorage.getItem("userToken"));
  let [userName, setUserName] = useState(localStorage.getItem("userName"));

  return (
    <TokenContext.Provider value={{ setLogin, login, setUserName, userName }}>
      {children}
    </TokenContext.Provider>
  );
}
