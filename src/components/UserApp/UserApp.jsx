import { Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import Navigation from "./Navigation/Navigation";
import ProceduresList from "./ProceduresList/ProceduresList";
import ProductsList from "./ProductsList/ProductsList";
import Gallery from "./Gallery/Gallery";
import NotFound from "./../NotFound/NotFound";
import Categories from "./Categories/Categories";
import BookAppointment from "./BookAppointment/BookAppointment";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import Checkout from "./Checkout/Checkout";
import ProductItemDetails from "./ProductItem/ProductItemDetails";

const UserApp = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/procedures/*" element={<ProceduresList />} />
        <Route path="/products/*" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductItemDetails />} />
        <Route
          path="/book-appointment/procedures/:id"
          element={<BookAppointment />}
        />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/categories/:id" element={<Categories />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default UserApp;
