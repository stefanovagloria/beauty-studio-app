import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./ProductItemDetails.module.css";
import image from "../../../assets/productsImage.png";
import { styled } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { or } from "firebase/firestore/lite";

const CustomButton = styled(Button)({
  margin: "2em",
  padding: "1em",
  borderRadius: "3em",
  backgroundColor: "#C8A2C8",
  color: "white",
  "&:hover": {
    backgroundColor: "#A875A8",
    color: "white",
  },
});

const ProductItemDetails = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(`http://localhost:4000/products/${id}`);
      setProduct(() => response.data);
    };

    getProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const addProductToLocalStorage = () => {
    let orderedItemsArr = localStorage.getItem("orderedItems");
    let orderedItems = orderedItemsArr ? JSON.parse(orderedItemsArr) : [];
    console.log(orderedItems);

    const productIndex = orderedItems.findIndex((i) => i._id === product._id);

    if (productIndex !== -1) {
      const currentProduct = orderedItems.filter((i) => i._id === product._id);
      console.log(currentProduct.quantity)
      orderedItems.splice(productIndex, 1, {
        ...product,
        quantity: currentProduct.quantity + quantity,
      });
    } else {
      orderedItems.push({ ...product, quantity: quantity });
    }

    localStorage.setItem("orderedItems", JSON.stringify(orderedItems));
  };

  const navigateToCheckout = () => {
    addProductToLocalStorage();
    navigate("/checkout");
  };

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
          <TextField
            className={styles.inputField}
            id="outlined-number"
            type="number"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={quantity}
            onChange={handleQuantityChange}
          />
          <CustomButton onClick={addProductToLocalStorage}>
            Добави в количка
          </CustomButton>
        </div>
      </div>
      <div>
        <CustomButton onClick={navigateToCheckout}>Поръчай сега</CustomButton>
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
