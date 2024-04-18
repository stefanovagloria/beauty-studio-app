import { useState } from "react";

import CategoriesList from "./CategoriesList/CategoriesList";
import AddProcedure from "./AddProcedure/AddProcedure";
import ProceduresList from "./ProceduresList/ProceduresList";

import styles from "./Procedures.module.css";
import { Card } from "@mui/material";

const Procedures = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSelectCategory = (category) => {
    console.log(category);
    setSelectedCategory(category);
  };

  return (
    <>
      <CategoriesList type="procedures" selectCategory={handleSelectCategory} />
      {selectedCategory && (
        <>
          <h1>Категория - {selectedCategory.name}</h1>
          <div className={styles.container}>
            <Card className={styles.btnContainer} onClick={handleClickOpen}>
              <span className={styles.btn}>+</span>
            </Card>
            <AddProcedure
              show={showModal}
              hide={handleClose}
              category={selectedCategory}
            />
            <ProceduresList id={selectedCategory._id} />
          </div>
        </>
      )}
    </>
  );
};

export default Procedures;
