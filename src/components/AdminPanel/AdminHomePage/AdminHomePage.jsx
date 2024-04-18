import { Routes, Route, Link } from "react-router-dom";

import Procedures from "../Procedures/Procedures";
import Products from "../Products/Products";
import Promotions from "../Promotions/Promotions";
import Articles from "../Articles/Articles";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import styles from "./AdminHomePage.module.css";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgb(148, 72, 220)",
  width: "12em",
  color: "white",
  padding: "1em 1.5em",
  margin: "0em 0.7em",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgb(190, 90, 220)",
  },
}));

const AdminHomePage = () => {
  return (
    <>
      <div className={styles.container}>
        <Link to="/admin/procedures">
          <CustomButton variant="contained" size="large">
            ПРОЦЕДУРИ
          </CustomButton>
        </Link>
        <Link to="/admin/products">
          <CustomButton variant="contained" size="large">
            ПРОДУКТИ
          </CustomButton>
        </Link>
        <Link to="/admin/promotions">
          <CustomButton variant="contained" size="large">
            ПРОМОЦИИ
          </CustomButton>
        </Link>
        <Link to="/admin/articles">
          <CustomButton variant="contained" size="large">
            СТАТИИ
          </CustomButton>
        </Link>
      </div>
      <Routes>
        <Route path="/procedures/*" element={<Procedures />} />
        <Route path="/products/*" element={<Products />} />
        <Route path="/articles/*" element={<Articles />} />
        <Route path="/promotions" element={<Promotions />} />
      </Routes>
    </>
  );
};

export default AdminHomePage;
