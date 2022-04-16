import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactChildren,
  ReactChild,
} from 'react';
import { useNavigate } from 'react-router-dom';

type userType = {
  email: string;
  type: string;
  firstname?: string;
  lastname?: string;
  _id?: string;
};
interface AuthContextProps {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}

interface AuthContextInterface {
  user: userType | null;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
  loggedIn: boolean;
  login: (data: userType) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextInterface | null>(null);
const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<userType | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (data: userType) => {
    setLoggedIn(true);
    setUser(data);
  };

  const logout = () => {
    setLoggedIn(false);
    setUser(null);
  };
  const values = {
    user,
    setUser,
    loggedIn,
    login,
    logout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
