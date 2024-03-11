import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

import AddProcedure from "../AddProcedure/AddProcedure";

import Card from "@mui/material/Card";
import styles from "./SelectedCategory.module.css";

const SelectedCategory = () => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() =>{
    const getCategory = async () =>{
        const response = await axios.get(`http://localhost:4000/admin/categories/${id}`);
        console.log(response.data.name)
        setSelectedCategory(response.data.name)
    }

    getCategory();
  },[])

  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <h1>Selected Category</h1>
      <Card className={styles.btnContainer} onClick={handleClickOpen}>
        <span className={styles.btn}>+</span>
      </Card>
      <AddProcedure show={showModal} hide={handleClose} category={selectedCategory}/>
    </>
  );
};

export default SelectedCategory;
