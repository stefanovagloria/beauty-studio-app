import { NavLink } from "react-router-dom";

import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import styles from "./AdminHomePage.module.scss";

import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

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
  const { logout } = useContext(AuthContext);

  return (
    <>
      <div className={styles.logoutContainer}>
        <Button
          onClick={logout}
          variant="contained"
          color="secondary"
          startIcon={<LogoutIcon />}
          className={styles.logoutBtn}
        >
          Logout
        </Button>
      </div>

      <div className={styles.container}>
        <NavLink to={`/admin/procedures`} className={({ isActive }) => isActive ?  `${styles.active}` : ""}>
          <CustomButton variant="contained" size="large"  > 
            ПРОЦЕДУРИ
          </CustomButton>
        </NavLink>
        <NavLink to="/admin/products" className={({ isActive }) => isActive ?  `${styles.active}` : ""}>
          <CustomButton variant="contained" size="large" >
            ПРОДУКТИ
          </CustomButton>
        </NavLink>
        <NavLink to="/admin/promotions" className={({ isActive }) => isActive ?  `${styles.active}` : ""}>
          <CustomButton variant="contained" size="large" >
            ПРОМОЦИИ
          </CustomButton>
        </NavLink>
        <NavLink to="/admin/articles" className={({ isActive }) => isActive ?  `${styles.active}` : ""}>
          <CustomButton variant="contained" size="large" >
            СТАТИИ
          </CustomButton>
        </NavLink>
        <NavLink to="/admin/orders" className={({ isActive }) => isActive ?  `${styles.active}` : ""}>
          <CustomButton variant="contained" size="large" >
            ПОРЪЧКИ
          </CustomButton>
        </NavLink>
      </div>
    </>
  );
};

export default AdminHomePage;
