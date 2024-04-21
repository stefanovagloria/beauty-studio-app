import { useState } from "react";

import AddProduct from "./AddProduct/AddProduct";
import ProductsList from "./ProductsList/ProductsList";
import CategoriesList from "../Procedures/CategoriesList/CategoriesList";

import Card from "@mui/material/Card";
import styles from "./Products.module.css";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showModal, setShowModal] = useState(false);

  const onCloseClickHandler = () => {
    setShowModal(false);
    setSelectedProduct({})
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSelectProdukt = (product) => {
    console.log(product)
    setSelectedProduct(product);
    setShowModal(true);
  }

  return (
    <>
      <CategoriesList type="products" selectCategory={handleSelectCategory} />
      {selectedCategory && (
        <>
          <h1>Категория - {selectedCategory.name}</h1>
          <div className={styles.container}>
            <Card
              className={styles.btnContainer}
              onClick={() => setShowModal(true)}
            >
              <span className={styles.btn}>+</span>
            </Card>
            <AddProduct
              show={showModal}
              hide={onCloseClickHandler}
              categoryId={selectedCategory._id}
              selectedProduct={selectedProduct}
            />
            <ProductsList id={selectedCategory._id} selectProduct={handleSelectProdukt}/>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
