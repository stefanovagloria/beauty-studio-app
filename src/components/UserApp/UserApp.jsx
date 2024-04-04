import { Routes, Route } from "react-router-dom";

import Navigation from "./Navigation/Navigation";
import Procedures from "./Procedures/Procedures";
import Products from "./Products/Products";

const UserApp = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/procedures/*" element={<Procedures />} />
        <Route path="/products/*" element={<Products />} />
      </Routes>
    </>
  );
};

export default UserApp;
