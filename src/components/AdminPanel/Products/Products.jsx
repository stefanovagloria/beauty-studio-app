import Card from "@mui/material/Card";
import styles from "./Products.module.css";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct/AddProduct";
import ProductsList from "./ProductsList/ProductsList";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:4000/admin/products");
      setProducts(response.data);
      console.log(response.data);
    };

    getProducts();
  }, []);

  const onAddClickHandler = () => {
    setShowModal(true);
  };

  const onCloseClickHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <h1>Products!</h1>
      <div className={styles.container}>
        <Card className={styles.btnContainer} onClick={onAddClickHandler}>
          <span className={styles.btn}>+</span>
        </Card>
        {showModal && <AddProduct hide={onCloseClickHandler} />}
        {products.length && <ProductsList products={products} />}
      </div>
    </>
  );
};

export default Products;
