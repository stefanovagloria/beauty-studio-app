import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button/Button";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import OrderDetails from "./OrderDetails";

import styles from './OrderItem.module.scss';

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgb(148, 72, 220)",
  width: "5em",
  height: "3.5em",
  color: "white",
  margin: "0.2em 0.7em",
  padding: "2em 3em",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgb(190, 90, 220)",
  },
}));

const OrderItem = ({ order, updateOrder }) => {
  const [openDetails, setOpenDetails] = useState(false);

  const closeDetails = () => {
    setOpenDetails(false);
  };

  const date = new Date(order.date).toLocaleDateString("en-GB");
  return (
    <>
      <TableRow
        key={order._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        className={styles.row}
      >
        <TableCell component="th" scope="row">
          {order.status}
        </TableCell>
        <TableCell align="center">{date}</TableCell>
        <TableCell align="center">{order.totalPrice}</TableCell>
        <TableCell align="center">1</TableCell>

        <TableCell align="center" sx={{ color: "white" }}>
          <CustomButton onClick={() => setOpenDetails(true)}>
            Преглед{" "}
          </CustomButton>
        </TableCell>
      </TableRow>
      {openDetails && (
        <OrderDetails
          open={openDetails}
          closeDetails={closeDetails}
          order={order}
          updateOrder={updateOrder}
        />
      )}
    </>
  );
};

export default OrderItem;
