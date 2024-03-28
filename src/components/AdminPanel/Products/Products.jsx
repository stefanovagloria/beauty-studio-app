import { useState } from "react";

import AddProduct from "./AddProduct/AddProduct";
import ProductsList from "./ProductsList/ProductsList";
import CategoriesList from "../Procedures/CategoriesList/CategoriesList";

import Card from "@mui/material/Card";
import styles from "./Products.module.css";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onAddClickHandler = () => {
    setShowModal(true);
  };

  const onCloseClickHandler = () => {
    setShowModal(false);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <CategoriesList type="products" selectCategory={handleSelectCategory} />
      {selectedCategory && (
        <>
          <h1>Selected Category - {selectedCategory.name}</h1>
          <div className={styles.container}>
            <Card className={styles.btnContainer} onClick={onAddClickHandler}>
              <span className={styles.btn}>+</span>
            </Card>
            {showModal && (
              <AddProduct
                hide={onCloseClickHandler}
                categoryId={selectedCategory._id}
              />
            )}
            <ProductsList id={selectedCategory._id} />
          </div>
        </>
      )}
    </>
  );
};

export default Products;
