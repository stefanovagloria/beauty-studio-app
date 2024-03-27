import styles from './ProductsList.module.css';
import Card from "@mui/material/Card";

const ProductsList = ({products}) => {
    return (
        <div className={styles.container}>
          {products.map((product) => (
            <Card key={product._id} className={styles.btnContainer}>
              <span className={styles.btn}>Product</span>
            </Card>
          ))}
        </div>
      );
}

export default ProductsList;