import { useTypedSelector } from "@/app/hook";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PROTECTED_ROUTES } from "./common/routePath";

const AuthRoute = () => {
  const { accessToken, user } = useTypedSelector((state) => state.auth);
  const location = useLocation();

  console.log("AuthRoute:", {
    path: location.pathname,
    accessToken,
    user,
  });

  // User is not logged in → allow auth pages
  if (!accessToken || !user) {
    return <Outlet />;
  }

  // Already logged in → go to dashboard
  if (location.pathname !== PROTECTED_ROUTES.OVERVIEW) {
    return <Navigate to={PROTECTED_ROUTES.OVERVIEW} replace />;
  }

  return <Outlet />;
};

export default AuthRoute;