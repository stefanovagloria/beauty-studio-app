import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { useSelector } from "react-redux";


const OrderTable = () => {

  const state = useSelector((state) => state.cart);
  const { items, total, getItemsAndTotalPrice } = useContext(CartContext);

  useEffect(() => {
    const setState = async () => {
      const contextData = await getItemsAndTotalPrice();
      setOrderedProducts(contextData.items);
      setTotalPrice(contextData.total);
    };

    setState();
  }, [items, total]);
  return (
    <TableContainer component={Paper} style={{ marginBottom: "2em" }}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Продукт</TableCell>
            <TableCell></TableCell>
            <TableCell align="right">Цена</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.items &&
            state.items.map((product) => (
              <TableRow
                key={product._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">x {product.quantity}</TableCell>
                <TableCell align="right">{product.price} лв.</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", fontSize: "1em" }}>
              Обща сума:
            </TableCell>
            <TableCell></TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              {state.totalPrice} лв
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
