import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";

export default function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/dashboard", { replace: true }); // clean up URL
    }
  }, [location, navigate]);

  return <Dashboard />;
}
