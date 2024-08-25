import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const ProtectedRoute = ({ element }) => {
  const { authData } = useContext(AuthContext);
  console.log(authData)

  // Check if the user is logged in
  if (authData === null) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // If authenticated, return the element to be rendered
  return element;
};

export default ProtectedRoute;