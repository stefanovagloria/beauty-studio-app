import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './ProductsList.module.css';
import Card from "@mui/material/Card";

const ProductsList = ({id}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
        `http://localhost:4000/admin/products/${id}`
      );

      setProducts(response.data);
      console.log(response.data);
    };

    getProducts();
  }, [id]);

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