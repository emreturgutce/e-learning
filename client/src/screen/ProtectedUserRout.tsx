import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContent";
import { ReactChild } from "react";
type ProtectedUserRoutProps = {
  children: JSX.Element | JSX.Element[] | ReactChild[],
  user?: string,
}


function ProtectedUserRout(props: ProtectedUserRoutProps): any {
  const data = useAuth();
  console.log(data)
  const isAdminReturn = (data?.user?.type === props.user ? (props.children) : (<Navigate to="/signin" />))
  return isAdminReturn;
}

export default ProtectedUserRout;
