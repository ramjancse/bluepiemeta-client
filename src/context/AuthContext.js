// "use client";

// import { useRouter } from "next/navigation";

// const { createContext, useState, useEffect } = require("react");

// const AuthContext = createContext("");

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const localStorageToke = JSON.parse(localStorage.getItem("token"));
//     setToken(localStorageToke);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ token, setToken }}>
//       {token ? children : router.push("/login")}
//     </AuthContext.Provider>
//   );
// };
