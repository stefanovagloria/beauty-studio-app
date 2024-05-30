import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import styles from "./ProductItemDetails.module.css";
import image from "../../../assets/productsImage.png";
import { styled } from "@mui/system";
import { Button, Input } from "@mui/material";

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
      const characteristics = response.data.characteristics;
      const updatedCharacteristics = characteristics.slice(1);
      console.log(updatedCharacteristics);
      setProduct({ ...response.data, characteristics: updatedCharacteristics });
      console.log(response.data);
    };

    getProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const addProductToLocalStorage = () => {
    let orderedItemsArr = localStorage.getItem("orderedItems");
    let orderedItems = orderedItemsArr ? JSON.parse(orderedItemsArr) : [];

    const productIndex = orderedItems.findIndex((i) => i._id === product._id);

    if (productIndex !== -1) {
      const currentProduct = orderedItems.find((i) => i._id === product._id);
      console.log(currentProduct);
      orderedItems.splice(productIndex, 1, {
        ...product,
        quantity: Number(currentProduct.quantity) + Number(quantity),
      });
    } else {
      orderedItems.push({ ...product, quantity: Number(quantity) });
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
          <h1 className={styles.name}>{product.name}</h1>
          {product.characteristics &&
            product.characteristics.length > 0 &&
            product.characteristics.map((ch, i) => (
              <p key={i}>
                {ch.key} : {ch.value}
              </p>
            ))}
          <p className={styles.price}>{product.price} лв</p>
          <Input 
            className={styles.inputField}
            id="outlined-number"
            type="number"
            size="smaller"
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
        <p>Сходни продукти</p>
        <div style={{ height: "100px", marginBottom: "2em" }}>
          {product.relatedProducts &&
            product.relatedProducts.length > 0 &&
            product.relatedProducts.map((p) => (
              <Link to={`/products/${p._id}`} key={p._id}>
                <img src={image} className={styles.relatedImg} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductItemDetails;
