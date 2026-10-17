import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  return user ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoute;
