import { Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import Navigation from "./Navigation/Navigation";
import Procedures from "./Procedures/Procedures";
import Products from "./Products/Products";
import Gallery from "./Gallery/Gallery";
import NotFound from "./../NotFound/NotFound";

const UserApp = () => {
  return (
    <>
      <Navigation />
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/procedures/*" element={<Procedures />} />
        <Route path="/products/*" element={<Products />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
};

export default UserApp;
