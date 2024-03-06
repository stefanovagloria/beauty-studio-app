import { Routes, Route, Link } from "react-router-dom";

import Procedures from "../Procedures/Procedures";

import Button from "@mui/material/Button";
import styles from "./AdminHomePage.module.css";

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
        <Button variant="contained" size="large" className={styles.button}>
          ПРОДУКТИ
        </Button>
        <Button variant="contained" size="large" className={styles.button}>
          ПРОМОЦИИ
        </Button>
      </div>
      <Routes>
        <Route path="/procedures" element={<Procedures />} />
      </Routes>
    </>
  );
};

export default AdminHomePage;
