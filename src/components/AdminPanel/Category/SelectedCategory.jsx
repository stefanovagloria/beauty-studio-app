import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AddProcedure from "../AddProcedure/AddProcedure";
import ProceduresList from "../ProceduresList/ProceduresList";

import Card from "@mui/material/Card";
import styles from "./SelectedCategory.module.css";

const SelectedCategory = () => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      const response = await axios.get(
        `http://localhost:4000/admin/categories/${id}`
      );
      setSelectedCategory(response.data);
    };

    getCategory();
  }, [id]);

  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Selected Category - {selectedCategory.name}</h1>
      <div className={styles.container}>
        <Card className={styles.btnContainer} onClick={handleClickOpen}>
          <span className={styles.btn}>+</span>
        </Card>
        <AddProcedure
          show={showModal}
          hide={handleClose}
          category={selectedCategory}
        />
        <ProceduresList id={id} />
      </div>
    </div>
  );
};

export default SelectedCategory;
