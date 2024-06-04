import { Link } from "react-router-dom";

import styles from "./Category.module.scss";

const Category = ({ category, selectCategory, type}) => {
  return (
    <>
      <Link to={`/admin/${type}/${category._id}`}>
        <button onClick={() => selectCategory(category)} className={styles.button}>{category.name}</button>
      </Link>
    </>
  );
};

export default Category;
