import { useState } from "react";
import axios from "axios";
import styles from "./Procedures.module.css";

const Procedures = () => {
  const [categoryValue, setCategoryValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [showInputField, setShowInputField] = useState(false);

  const onChangeHandler = (e) => {
    setCategoryValue(e.target.value);
  };

  const addCategory = async () => {
    setCategories((categories) => [...categories, categoryValue]);

    const categoryData = { name: categoryValue };
    console.log("Sending data..");
    try {
      const response = await axios.post(
        "http://localhost:4000/procedures",
        categoryData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data sent:", response.data);
      // Handle success
    } catch (error) {
      console.error("Error sending data");
      // Handle error
    }
  };

  return (
    <>
      <h1>Категории</h1>
      {categories.map((c) => (
        <button className={styles.button}>{c}</button>
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

export default Procedures;
