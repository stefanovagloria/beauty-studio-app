import { useEffect, useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ];

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    const orderedProductsArr = localStorage.getItem('orderedProducts');
    setOrderedProducts(orderedProducts);
  },[])

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Количка
        </Typography>
        <List>
          {products.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} secondary={`$${item.price}`} />
              <ListItemSecondaryAction>
                <Button
                  color="secondary"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">Total: ${total}</Typography>
      </Container>
    </>
  );
};

export default ShoppingCart;
