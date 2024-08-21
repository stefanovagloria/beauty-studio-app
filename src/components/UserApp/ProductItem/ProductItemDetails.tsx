import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { sendItemData } from "../../../store/cart-slice";

import styles from "./ProductItemDetails.module.css";
import image from "../../../assets/productsImage.png";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import { Product } from "../../../models/product";
import { useAppDispatch } from "../../../store";
import { CartItem } from "../../../models/cartItem";

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
  const [product, setProduct] = useState<Product  | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(`http://localhost:4000/products/${id}`);
      const characteristics = response.data.characteristics;
      const updatedCharacteristics = characteristics.slice(1);
      setProduct({ ...response.data, characteristics: updatedCharacteristics });
      console.log(response.data);
    };

    getProduct();
  }, [id]);

  const addProductToShoppingCart = () => {
    if (product) {
      dispatch(sendItemData(product));
    }
  };

  const navigateToCheckout = () => {
    addProductToShoppingCart();
    navigate("/checkout");
  };

  return (
    <div className={styles.mainContainer}>
      {product && (
        <>
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
              <CustomButton onClick={addProductToShoppingCart}>
                Добави в количка
              </CustomButton>
            </div>
          </div>
          <div>
            <CustomButton onClick={navigateToCheckout}>
              Поръчай сега
            </CustomButton>
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
        </>
      )}
    </div>
  );
};

export default ProductItemDetails;
