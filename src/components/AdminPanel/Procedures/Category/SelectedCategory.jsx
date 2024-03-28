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

  useEffect(() => {
    const getCategory = async () => {
      const response = await axios.get(
        `http://localhost:4000/admin/categories/${id}`
      );
      setSelectedCategory(response.data);
    };

    getCategory();
  }, [id]);

  return (
    <div className={styles.mainContainer}>
      <h1>Selected Category - {selectedCategory.name}</h1>
    </div>
  );
};

export default SelectedCategory;
