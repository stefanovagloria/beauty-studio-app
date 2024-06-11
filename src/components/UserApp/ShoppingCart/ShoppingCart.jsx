import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import styles from "./ShoppingCart.module.scss";

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

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ShoppingCart = () => {
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const { items, total, getItemsAndTotalPrice, updateItem, removeItem } =
    useContext(CartContext);

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const setState = async () => {
      const contextData = await getItemsAndTotalPrice();
      setOrderedProducts(contextData.items);
      setTotalPrice(contextData.total);
    };

    setState();
  }, [items, total]);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleNavigate = () => {
    navigate("/checkout");
  };

  return (
    <>
      {orderedProducts.length > 0 && (
        <Container
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Container sx={{ marginTop: 4 }} className={styles.items}>
            <Typography variant="h5" gutterBottom>
              Количка
            </Typography>
            <List>
              {orderedProducts.map((item) => (
                <ListItem key={item._id} className={styles.listItem}>
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.price} лв`}
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      className={styles.inputField}
                      id="outlined-number"
                      type="number"
                      size="small"
                      name="quantity"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={item.quantity}
                      onChange={(e) => updateItem(e, item._id)}
                    />
                    <Button
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        padding: "1em",
                        borderRadius: "0.7em",
                      }}
                      onClick={() => removeItem(item._id)}
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
            <Typography variant="h6">{totalPrice} лв</Typography>
            <Button
              className={styles.btn}
              onClick={handleOpen}
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "1em",
                borderRadius: "0.7em",
              }}
            >
              Приключване на поръчката
            </Button>
          </Container>
          <Dialog
            open={openModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Сигурни ли сте, че искате да поръчате?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description"></DialogContentText>
            </DialogContent>
            <DialogActions className={styles.btnContainer}>
              <Button
                onClick={handleClose}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "1em",
                  borderRadius: "0.7em",
                }}
              >
                Откажи
              </Button>
              <Button
                onClick={handleNavigate}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "1em",
                  borderRadius: "0.7em",
                }}
                autoFocus
              >
                Да
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      )}
      {orderedProducts.length == 0 && (
        <p>Все още няма добавени продукти в количката!</p>
      )}
    </>
  );
};

export default ShoppingCart;
