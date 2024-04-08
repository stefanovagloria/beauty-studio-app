import { Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import Navigation from "./Navigation/Navigation";
import ProceduresList from "./ProceduresList/ProceduresList";
import Products from "./Products/Products";
import Gallery from "./Gallery/Gallery";
import NotFound from "./../NotFound/NotFound";
import Categories from "./Categories/Categories";

const UserApp = () => {
  return (
    <>
      <Navigation />
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/procedures/*" element={<ProceduresList />} />
        <Route path="/products/*" element={<Products />} />
        <Route path="/categories/:id" element={<Categories />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
};

export default UserApp;
