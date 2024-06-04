import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import styles from "./CategoriesList.module.scss";

const CategoriesList = ({ type, selectCategory }) => {
  const [categories, setCategories] = useState([]);

  const [categoryValue, setCategoryValue] = useState("");
  const [showInputField, setShowInputField] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error:", error);
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
      setCategories((categories) => [...categories, response.data]);
      setCategoryValue("");
    } catch (error) {
      console.error("Error sending data");
    }
  };

  return (
    <>
      {categories.map((category) => (
        <NavLink
          key={category._id}
          to={`/admin/${type}/${category._id}`}
          className={({ isActive }) => (isActive ? `${styles.active}` : "")}
        >
          <button
            onClick={() => selectCategory(category)}
            className={styles.button}
          >
            {category.name}
          </button>
        </NavLink>
      ))}
      <button
        className={styles.addInput}
        onClick={() => setShowInputField(true)}
      >
        +
      </button>
      {showInputField && (
        <div>
          <input
            name="category"
            value={categoryValue}
            onChange={onChangeHandler}
            className={styles.input}
          />
          <button onClick={addCategory} className={styles.addBtn}>
            Добави
          </button>
          <button
            className={styles.addBtn}
            onClick={() => setShowInputField(false)}
          >
            x
          </button>
        </div>
      )}
    </>
  );
};

export default CategoriesList;
