import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  if (!user) {
    const userInfo = JSON.parse(localStorage.getItem("user")) || null;
    setUser(userInfo);
  }

  const signup = (data) => {
    setUser(data);
  };
  const login = (data) => {
    setUser(data);
  };

  const logout = async () => {};

  const userInfo = {
    user,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
