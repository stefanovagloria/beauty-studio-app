import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import styles from "./Category.module.css";
import SelectedCategory from "./SelectedCategory";

const Category = ({ category }) => {


  return (
    <>
      <Link to={`/admin/procedures/${category._id}`}>
        <button className={styles.button}>
          {category.name}
        </button>
      </Link>
    </>
  );
};

export default Category;
