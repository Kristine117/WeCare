import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";


const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(UserContext);

  // Check if the user is authenticated
  if (!user.isSuccess) {
    return <Navigate to="/login" />;
  }

  // Check if the user's role matches the allowedRoles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;  // Redirect to home or "not authorized" page
  }

  // If authenticated and role is allowed, render the child components (route content)
  return children;
};

export default ProtectedRoute;
