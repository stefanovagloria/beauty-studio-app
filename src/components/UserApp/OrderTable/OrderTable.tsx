import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Product } from "../../../models/product";
import { RootState } from "../../../store";
import { CartItem } from "../../../models/cartItem";

const OrderTable = () => {
  // Typing the useSelector hook with RootState to ensure type safety
  const state = useSelector((state: RootState) => state.cart);

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
            state.items.map((cartItem: CartItem) => (
              <TableRow
                key={cartItem._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                {cartItem.name}
                </TableCell>
                <TableCell align="right">x {cartItem.quantity}</TableCell>
                <TableCell align="right">{cartItem.price} лв.</TableCell>
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
