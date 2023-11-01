import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  signup: (data) => {},
  login: (data) => {},
  logout: () => {},
});

export default AuthContext;
