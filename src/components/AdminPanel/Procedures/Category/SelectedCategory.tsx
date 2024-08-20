import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./SelectedCategory.module.scss";
import { Category } from "../../../../models/category";

const SelectedCategory = () => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    const getCategory = async () => {
      const response = await axios.get(
        `http://localhost:4000/categories/${id}`
      );
      setSelectedCategory(response.data);
    };

    getCategory();
  }, [id]);

  return (
    <div className={styles.mainContainer}>
      {selectedCategory && <h1>Selected Category - {selectedCategory.name}</h1>}
    </div>
  );
};

export default SelectedCategory;
