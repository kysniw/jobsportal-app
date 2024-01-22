import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContextType, UserResponse, UserType } from "../lib/types";
import { getUser, logoutUser } from "../lib/actions";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserData = useCallback(async () => {
    const userRes = (await getUser()) as UserResponse;
    if (userRes.user) {
      setUser(userRes.user);
      setIsLoading(false);
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      loadUserData();
    }
  }, [loadUserData, user]);

  const handleUserData = (user: UserType) => {
    setUser(user);
  };

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.success) {
      setUser(null);
      // alert(res.message);
    } else {
      alert(res.error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        user,
        handleUserData,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "You can not use useAuthContext if is not within a AuthContextProvider!"
    );
  }

  return context;
};

export default AuthProvider;
