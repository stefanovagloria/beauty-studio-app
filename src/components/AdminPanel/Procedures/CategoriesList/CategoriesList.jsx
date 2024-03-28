import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import styles from "./CategoriesList.module.css";

import Category from "../Category/Category";
import SelectedCategory from "../Category/SelectedCategory";

const CategoriesList = ({type,selectCategory}) => {
  const [categoryValue, setCategoryValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [showInputField, setShowInputField] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/admin/categories");
        setCategories(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();  
  }, []);

  const onChangeHandler = (e) => {
    setCategoryValue(e.target.value);
  };

  const addCategory = async () => {
    
    const categoryData = { name: categoryValue };
    try {
      const response = await axios.post(
        "http://localhost:4000/admin/categories",
        categoryData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      setCategories(categories => [...categories, response.data]);
      setCategoryValue('');
    } catch (error) {
      console.error("Error sending data");
    }
  };

  return (
    <>
      <h1>Категории</h1>
      {categories.map((c) => (
        <Category key={c._id} category={c}  selectCategory={selectCategory} type={type}/>
      ))}
      <button className={styles.button} onClick={() => setShowInputField(true)}>
        +
      </button>
      {showInputField && (
        <div>
          <input
            name="category"
            value={categoryValue}
            onChange={onChangeHandler}
          />
          <button onClick={addCategory}>Добави</button>
        </div>
      )}
    
    </>
  );
};

export default CategoriesList;
