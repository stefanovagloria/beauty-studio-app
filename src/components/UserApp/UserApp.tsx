import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from "./Home/Home";
import Navigation from "./Navigation/Navigation";
import ProceduresList from "./ProceduresList/ProceduresList";
import ProductsList from "./ProductsList/ProductsList";
import Gallery from "./Gallery/Gallery";
import NotFound from "../NotFound/NotFound";
import Categories from "./Categories/Categories";
import BookAppointment from "./BookAppointment/BookAppointment";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import Checkout from "./Checkout/Checkout";
import ProductItemDetails from "./ProductItem/ProductItemDetails";
import ProcedureItemDetails from "./ProcedureItem/ProcedureItemDetails";
import Footer from "./Footer/Footer";
import About from "./About/About";
import styles from "./UserApp.module.scss";
import { getItemData } from "../../store/cart-slice";

import { AppDispatch } from "../../store";

const UserApp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getItemData());
  }, [dispatch]);

  return (
    <div className={styles.appContainer}>
      <Navigation />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/procedures/:id" element={<ProcedureItemDetails />} />
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
          <Route path="/about-us" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default UserApp;
