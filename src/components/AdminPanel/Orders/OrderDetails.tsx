import { useState, useRef, useEffect } from "react";
import axios from "axios";
import OrderedProductsTable from "./OrderedProductsTable";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { styled } from "@mui/material/styles";
import styles from "./OrderDetails.module.scss";
import OrderConfirmation from "./OrderConfirmation";
import { Product } from "../../../models/product";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgb(148, 72, 220)",
  width: "8em",
  height: "1em",
  color: "white",
  margin: "0.2em 0.7em",
  padding: "1em 3em",
  border: "0.1em solid black",
  borderRadius: "2em",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgb(190, 90, 220)",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgb(148, 72, 220)",
  maxWidth: "15em",
  color: "white",
  padding: "1em 1.5em",
  margin: "0em 0.7em",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgb(190, 90, 220)",
  },
}));

const OrderDetails = ({ open, closeDetails, order, updateOrder }) => {
  const descriptionElementRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(`http://localhost:4000/products`);
      const data = response.data.filter((p: Product) =>
        order.products.includes(p._id)
      );
      setOrderedProducts(data);
    };

    getProducts();
  }, [order.products]);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const updateOrderStatus = async () => {
    const response = await axios.put(
      `http://localhost:4000/admin/orders/${order._id}`,
      { ...order, status: "изпратена" }
    );
    closeModalHandler();
    updateOrder(order._id);
  };

  return (
    <Dialog
      open={open}
      onClose={closeDetails}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={styles.container}
    >
      <DialogTitle
        id="scroll-dialog-title"
        align="center"
        className={styles.title}
      >
        <div className={styles.orderNumber}> Поръчка Номер 3 </div>
        <button className={styles.closeBtn} onClick={closeDetails}>
          X
        </button>
      </DialogTitle>
      <DialogContent dividers={scroll === "paper"} className={styles.content}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <div className={styles.status}>
            Статус:{" "}
            <CustomButton
              onClick={openModalHandler}
              disabled={order.status === "изпратена"}
            >
              {order.status}
            </CustomButton>
          </div>
          <div>
            <div className={styles.products}>Продукти</div>
            <OrderedProductsTable orderedProducts={order.products} />
          </div>
          <div className={styles.delivery}>Доставка: 5лв</div>
          <div>
            Данни за доставка:
            <div>
              <div>
                Име: {order.user.name} {order.user.surname}
              </div>
              <div>
                Адрес: {order.user.city} - {order.user.street}
              </div>
              <div>Телефон: {order.user.phoneNumber}</div>
              <div>Имейл: {order.user.email}</div>
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ActionButton onClick={closeDetails}>Затвори</ActionButton>
        <ActionButton
          onClick={closeDetails}
          style={{ width: "40em", height: "3.8em" }}
        >
          Изпрати имейл потвърждение
        </ActionButton>
      </DialogActions>
      {openModal && (
        <OrderConfirmation
          openModal={openModal}
          closeModalHandler={closeModalHandler}
          updateOrderStatus={updateOrderStatus}
        />
      )}
    </Dialog>
  );
};

export default OrderDetails;
