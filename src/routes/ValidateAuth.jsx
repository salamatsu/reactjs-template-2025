import { Navigate, Outlet } from "react-router";
import { useEffect } from "react";

import { useCurrentActiveUserToken } from "../store/hotelStore";
export const Auth = ({ store, redirect }) => {
  const { userData, token } = store();
  const { setToken } = useCurrentActiveUserToken()

  useEffect(() => {
    setToken(token);
  }, [token]);

  return userData && token ? <Outlet /> : <Navigate to={redirect} />;
};

export const UnAuth = ({ store, redirect = "/" }) => {
  const { userData, token } = store();

  return userData && token ? <Navigate to={redirect} /> : <Outlet />;
};
