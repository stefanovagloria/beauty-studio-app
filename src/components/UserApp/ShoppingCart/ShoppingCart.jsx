import { useEffect, useState } from "react";

import {
  Button,
  Container,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  TextField,
} from "@mui/material";

import styles from "./ShoppingCart.module.css";

const ShoppingCart = () => {
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    const orderedProductsArr = localStorage.getItem("orderedItems");
    let orderedItems = orderedProductsArr ? JSON.parse(orderedProductsArr) : [];
    setOrderedProducts(orderedItems);
  }, []);

  const removeFromCart = (productId) => {
    setOrderedProducts(
      orderedProducts.filter((item) => item._id !== productId)
    );
  };

  const total = orderedProducts.reduce((acc, item) => acc + item.price, 0);

  return (
    <Container className={styles.container}>
      <Container sx={{ marginTop: 4 }} className={styles.items}>
        <Typography variant="h5" gutterBottom>
          Количка
        </Typography>
        <List>
          {orderedProducts.map((item) => (
            <ListItem key={item._id} className={styles.listItem}>
              <ListItemText primary={item.name} secondary={`$${item.price}`} />
              <ListItemSecondaryAction>
                <TextField
                  className={styles.inputField}
                  id="outlined-number"
                  type="number"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={1}
                />
                <Button
                  color="secondary"
                  onClick={() => removeFromCart(item._id)}
                  className={styles.btn}
                >
                  X
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
      <Container className={styles.checkout}>
        <Typography variant="h5" gutterBottom>
          Обща сума
        </Typography>
        <Typography variant="h6">{total} лв</Typography>
        <Button className={styles.btn}>Приключване на поръчката</Button>
      </Container>
    </Container>
  );
};

export default ShoppingCart;
