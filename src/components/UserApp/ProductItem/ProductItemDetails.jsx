import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./ProductItemDetails.module.css";
import image from "../../../assets/productsImage.png";
import { styled } from "@mui/system";
import { Button } from "@mui/material";

const CustomButton = styled(Button)({
  margin: "2em",
  padding: "1em",
  borderRadius: "3em",
  backgroundColor: "#C8A2C8",
  color: "white",
  "&:hover": {
    backgroundColor: "#A875A8", 
    color: 'white'
  },
});

const ProductItemDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(`http://localhost:4000/products/${id}`);
      setProduct(() => response.data);
    };

    getProduct();
  }, [id]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div>
          <img src={image} />
        </div>
        <div>
          <p className={styles.name}>{product.name}</p>
          <p>Характеристики</p>
          <p className={styles.price}>{product.price} лв</p>
          <CustomButton>Добави в количка</CustomButton>
        </div>
      </div>
      <div>
        <CustomButton>Поръчай сега</CustomButton>
      </div>
      <div className={styles.description}>
        <p>{product.description}</p>
      </div>
      <div>
        <p>Сходни продукти:</p>
      </div>
    </div>
  );
};

export default ProductItemDetails;
