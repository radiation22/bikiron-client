import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/bikironlog.png";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
const StartPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (user) {
        navigate("/allLibrary");
      } else {
        navigate("/slider");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, user]);

  const zoomInStyle = {
    animation: "zoom-in 3s ease-in-out",
  };

  return (
    <div className="bg-[#50AE2A]">
      {isLoading ? (
        <div className="flex justify-center  items-center h-screen">
          <img className="h-48" src={logo} alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default StartPage;
