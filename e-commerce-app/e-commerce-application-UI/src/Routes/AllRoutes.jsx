import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App.jsx";
import Register from "../Public/Register.jsx";
import Login from "../Public/Login.jsx";
import Home from "../Public/Home.jsx";
import Cart from "../Private/Customer/Cart.jsx";
import { useAuth } from "../Auth/AuthProvider";
// const user = {
//   userId: "123",
//   userName: "akshaya",
//   accessexpiration: 3600,
//   refreshexpiration: 1296000,
//   authenticated: false,
//   role: "CUSTOMER"
// };
const AllRoutes = () => {
const {user}=useAuth();
const { role, authenticated } = user;
let routes = [];
if (authenticated) {
  role === "CUSTOMER"
    ? routes.push(<Route path="/cart" element={<Cart />} />)
    : role === "SELLER" &&
      routes.push(<Route path="/seller" element={<SellerDashboard />} />);
} else {
  role === "CUSTOMER" &&
    routes.push(
      <Route path="/" element={<Home />} />,
      <Route path="/login" element={<Login />} />,
      <Route path="/seller/register" element={<Register role={"SELLER"} />} />,
      <Route path="/customer/register" element={<Register role={"CUSTOMER"} />} />      
    );
}


  return (
    <Routes>
      <Route path="/" element={<App />}>
        {routes}
      </Route>
    </Routes>
  );
};

export default AllRoutes;
