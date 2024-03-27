import Card from "@mui/material/Card";
import styles from "./Products.module.css";
import { useState } from "react";
import AddProduct from "./AddProduct/AddProduct";

const ProductsList = () => {
  const [showModal, setShowModal] = useState(false);

  const onAddClickHandler = () => {
    setShowModal(true);
  };

  const onCloseClickHandler = () =>{
    setShowModal(false);
  }

  return (
    <>
      <h1>Products!</h1>
      <Card className={styles.btnContainer} onClick={onAddClickHandler}>
        <span className={styles.btn}>+</span>
      </Card>
      {showModal && <AddProduct hide={onCloseClickHandler}/>}
    </>
  );
};

export default ProductsList;
