import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./SelectedCategory.module.css";

const SelectedCategory = () => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState({});
  console.log(id);

  return (
    <>
      <h1>Selected Category</h1>
      <Card className={styles.btnContainer}>
        <span className={styles.btn}>+</span>
      </Card>
    </>
  );
};

export default SelectedCategory;
