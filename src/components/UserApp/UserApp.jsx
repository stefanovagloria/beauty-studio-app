import { Routes, Route } from "react-router-dom";

import Navigation from "./Navigation/Navigation";

const UserApp = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/procedures/*" element={<Procedures />} />
        <Route path="/products/*" element={<Products />} />
        <Route path="/promotions" element={<Promotions />} />
      </Routes>
    </>
  );
};

export default UserApp;
