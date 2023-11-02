import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const signup = (data) => {
    setUser(data);
  };
  const login = (data) => {
    setUser(data);
  };

  const logout = async () => {
    await axiosInstance
      .get("/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          const notify = () => toast.success("Logout successfully");
          notify();
          localStorage.clear();
        }
      });
  };

  const haveUser = localStorage.getItem("user");

  const userInfo = {
    user,
    setUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
