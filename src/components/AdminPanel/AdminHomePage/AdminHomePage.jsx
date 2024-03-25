import { Routes, Route, Link } from "react-router-dom";

import CategoriesList from "../CategoriesList/CategoriesList";
import ProductsList from "../ProductsList";

import Button from "@mui/material/Button";
import styles from "./AdminHomePage.module.css";
import Promotions from "../Promotions/Promotions";

const AdminHomePage = () => {
  return (
    <>
      <h1>Администраторски панел</h1>
      <div className={styles.container}>
        <Link to='/admin/procedures'>
          <Button variant="contained" size="large" className={styles.button}>
            ПРОЦЕДУРИ
          </Button>
        </Link>
        <Link to='/admin/products'>
        <Button variant="contained" size="large" className={styles.button}>
          ПРОДУКТИ
        </Button>
        </Link>
        <Link to='/admin/promotions'>
        <Button variant="contained" size="large" className={styles.button}>
          ПРОМОЦИИ
        </Button>
        </Link>
        
      </div>
      <Routes>
        <Route path="/procedures/*" element={<CategoriesList />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/promotions" element={<Promotions />} />
      </Routes>
    </>
  );
};

export default AdminHomePage;
