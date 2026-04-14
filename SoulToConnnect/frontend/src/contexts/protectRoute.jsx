import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
    useEffect(() => {
    if (!currentUser) {
     toast.error("You must be logged in!", {
  toastId: "auth-error",
});
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default ProtectedRoute;