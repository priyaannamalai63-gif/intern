import { Routes, Route } from "react-router-dom"; //page navigation library
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Products from "../pages/Products";



function AppRoutes() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
           <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
