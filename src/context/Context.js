import React, { createContext, useState } from "react";

// Bağlamı (context) oluşturma
export const Context = createContext();

// Bağlam sağlayıcısı bileşen
export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  return (
    <Context.Provider value={{ username, setUsername }}>
      {children}
    </Context.Provider>
  );
};
