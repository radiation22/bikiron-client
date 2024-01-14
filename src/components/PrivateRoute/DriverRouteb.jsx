/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const DriverRouteb = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [role, setRole] = useState("driver"); // State to store the user's role

  useEffect(() => {
    // Fetch the user's role when the component mounts
    if (user) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://e-wallet-server.vercel.app/validateUserRole?email=${user?.email}`
          );
          const userData = await response.json();

          setRole(userData?.userRole); // Assuming the role is in the response
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      };

      fetchData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="text-center">
        <button className="btn loading">Loading</button>
      </div>
    );
  }

  if (!user || role !== "driver") {
    // Redirect to the login page or another appropriate route
    return <Navigate to="/login2b" state={{ from: location }} replace />;
  }

  // Allow access to the protected route for "driver" role
  return children;
};

export default DriverRouteb;
