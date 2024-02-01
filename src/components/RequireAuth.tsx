import { useContext } from "react"
import { AuthContext } from "../store/AuthContext"
import { Navigate, Outlet, useLocation } from "react-router";

export const RequireAuth = () => {
  const { auth } = useContext(AuthContext);
  const {pathname} = useLocation();
  
  if (!auth) {
    return <Navigate to='/login' state={{pathname}} replace/>
  }

  return <Outlet />
}