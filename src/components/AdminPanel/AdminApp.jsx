import { Routes, Route } from "react-router-dom";

import Procedures from "./Procedures/Procedures";
import Products from "./Products/Products";
import Articles from "./Articles/Articles";
import Promotions from "./Promotions/Promotions";
import Orders from "./Orders/Orders";
import AdminHomePage from "./AdminHomePage/AdminHomePage";

const AdminApp = () => {
  return (
    <>
      <AdminHomePage />
      <Routes>
        <Route path="/procedures/*" element={<Procedures />} />
        <Route path="/products/*" element={<Products />} />
        <Route path="/articles/*" element={<Articles />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  );
};

export default AdminApp;
