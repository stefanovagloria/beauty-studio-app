import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Procedures.module.css";

const Procedures = () => {
  const [categoryValue, setCategoryValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [showInputField, setShowInputField] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request using Axios
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
    console.log("Sending data..");
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
      console.log("Data sent:", response.data._id);
      setCategories(categories => [...categories, response.data]);
      setCategoryValue('');
    } catch (error) {
      console.error("Error sending data");
      // Handle error
    }
  };

  return (
    <>
      <h1>Категории</h1>
      {categories.map((c) => (
        <button key={c._id} className={styles.button}>
          {c.name}
        </button>
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
