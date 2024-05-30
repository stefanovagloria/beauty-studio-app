import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

const OrderedproductsTable = ({ orderedProducts }) => {
  const [products, setProducts] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    if (orderedProducts && orderedProducts.length > 0) {
      setProducts(orderedProducts);
    }
  }, [orderedProducts]);

  useEffect(() => {
    const sum = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    setTotalSum(sum);
  }, [products]);

  return (
    <TableContainer component={Paper} style={{ width: "550px" }}>
      <Table sx={{ width: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Име</TableCell>
            <TableCell align="center">Цена</TableCell>
            <TableCell align="center">Брой</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="center">{product.price}</TableCell>
              <TableCell align="center">{product.quantity}</TableCell>
              <TableCell align="center">
                {product.price * product.quantity}лв
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="left">Обща сума:</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">{totalSum}лв</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderedproductsTable;
