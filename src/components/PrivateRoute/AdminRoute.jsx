import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Loader from "../Loader/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [role, setRole] = useState("admin"); // State to store the user's role

  useEffect(() => {
    // Fetch the user's role when the component mounts
    if (user) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://e-wallet-server.vercel.app/validateAdminRole?email=${user.email}`
          );
          if (response.ok) {
            const userData = await response.json();
            console.log(userData);
            setRole(userData.userRole);
          } else {
            // Handle the case where the response is not OK (e.g., 404 or 500 error)
            console.error("Error fetching user role:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      };

      fetchData();
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (!user || role !== "admin") {
    // Redirect to the login page or another appropriate route
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  // Allow access to the protected route for "admin" role
  return children;
};

export default AdminRoute;
