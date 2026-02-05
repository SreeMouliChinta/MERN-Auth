import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await api.get("/api/auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await api.get("/api/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const init = async () => {
      await getAuthState();
    };
    init();
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      userData,
      setUserData,
      getUserData,
    }),
    [isLoggedIn, userData],
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
