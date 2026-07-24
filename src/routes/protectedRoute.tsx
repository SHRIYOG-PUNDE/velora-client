import { useTypedSelector } from "@/app/hook";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AUTH_ROUTES } from "./common/routePath";

const ProtectedRoute = () => {
  const { accessToken, user } = useTypedSelector((state) => state.auth);
  const location = useLocation();

  console.log("ProtectedRoute:", {
    path: location.pathname,
    accessToken,
    user,
  });

  // Not logged in → go to login
  if (!accessToken || !user) {
    if (location.pathname !== AUTH_ROUTES.SIGN_IN) {
      return <Navigate to={AUTH_ROUTES.SIGN_IN} replace />;
    }

    return <Outlet />;
  }

  return <Outlet />;
};

export default ProtectedRoute;