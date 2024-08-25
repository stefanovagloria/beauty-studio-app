import { ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface ProtectedRoutePros {
  element: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRoutePros> = ({ element }) => {
  const { authData } = useContext(AuthContext);

  if (authData === null) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
