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
import OrderConfirmation from "./OrderConfirmation";

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

const OrderDetails = ({ open, closeDetails, order, updateOrder }) => {
  const descriptionElementRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [orderedProducts, setOrderedProducts] = useState([]);
  console.log(order);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(`http://localhost:4000/admin/products`);
      const data = response.data.filter((p) => order.products.includes(p._id));
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
    <>
      <Dialog
        open={open}
        onClose={closeDetails}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" align="center">
          Поръчка Номер 3
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div>
              Статус:{" "}
              <CustomButton onClick={openModalHandler} disabled={order.status === 'изпратена'}>
                {order.status}
              </CustomButton>
            </div>
            <div>
              Продукти:
              <OrderedProductsTable orderedProducts={order.products} />
            </div>
            <div>Доставка: 5лв</div>
            <div>
              Данни за доставка:
              <div>
                <p>
                  Име: {order.user.name} {order.user.surname}
                </p>
                <p>
                  Адрес: {order.user.city} - {order.user.street}
                </p>
                <p>Телефон: {order.user.phoneNumber}</p>
                <p>Имейл: {order.user.email}</p>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetails}>Затвори</Button>
          <Button onClick={closeDetails}>Изпрати имейл потвърждение</Button>
        </DialogActions>
        {openModal && (
          <OrderConfirmation
            openModal={openModal}
            closeModalHandler={closeModalHandler}
            updateOrderStatus={updateOrderStatus}
          />
        )}
      </Dialog>
    </>
  );
};

export default OrderDetails;