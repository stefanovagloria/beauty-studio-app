import { Link } from "react-router-dom";

import styles from "./Category.module.css";

const Category = ({ category }) => {
  return (
    <>
      <Link to={`/admin/procedures/${category._id}`}>
        <button className={styles.button}>{category.name}</button>
      </Link>
    </>
  );
};

export default Category;
