import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const lsUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(lsUser !== null ? lsUser : {});
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (lsuser === null) {
      if (location.pathname !== "/cadastro") {
        nav("/");
      }
    } else {
      if (location.pathname !== "/cadastro") {
        nav("/home");
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
