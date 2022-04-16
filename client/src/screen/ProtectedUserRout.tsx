import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContent";
import { ReactChild } from "react";
type ProtectedUserRoutProps = {
  children: JSX.Element | JSX.Element[] | ReactChild[],
  user?: boolean,
}


function ProtectedUserRout(props: ProtectedUserRoutProps): any {
  const data = useAuth();
  console.log(data?.user)
  const isAdminReturn = (data?.user?.type === "USER" ? (props.children) : (<Navigate to="/signin" />))
  const isUserReturn = data?.loggedIn ? (props.children) : (<Navigate to="/signin" />)

  return props.user ? isAdminReturn : isUserReturn;
}

export default ProtectedUserRout;
