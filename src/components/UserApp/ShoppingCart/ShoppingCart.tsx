import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { cartActions, getItemData, removeItemData, sendItemData } from "../../../store/cart-slice";

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
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() =>{
    dispatch(getItemData());
  }, [])

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleNavigate = () => {
    navigate("/checkout");
  };

  const addItemHandler = (e,item) =>{
    dispatch(sendItemData(item))
  }

  const removeItemHandler = (e,item) =>{
    dispatch(removeItemData(item));
  }

  return (
    <div className={styles.container}>
      {items.length > 0 && (
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
              {items.map((item) => (
                <ListItem key={item._id} className={styles.listItem}>
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.price} лв`}
                  />
                  <ListItemSecondaryAction>
                    <button className={styles.quantityButtons} onClick={(e) => removeItemHandler(e,item)}>-</button>
                    <span className={styles.quantityValue}>
                      {item.quantity}
                    </span>
                    <button className={styles.quantityButtons} onClick={(e) => addItemHandler(e,item)}>+</button>
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
      {items.length == 0 && <p>Все още няма добавени продукти в количката!</p>}
    </div>
  );
};

export default ShoppingCart;
