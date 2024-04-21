import styles from "./ProductsList.module.css";
import Card from "@mui/material/Card";

const ProductsList = ({ products, selectProduct }) => {
  return (
    <div className={styles.container}>
      {products.map((product) => (
        <Card
          sx={{
            overflow: "visible",
          }}
          key={product._id}
          className={styles.btnContainer}
          onClick={() => selectProduct(product)}
        >
          <span className={styles.btn}>{product.name}</span>
        </Card>
      ))}
    </div>
  );
};

export default ProductsList;
