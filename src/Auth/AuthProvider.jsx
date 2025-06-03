import { Children, createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null);

  const authData = {
    name: "rakib",
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
