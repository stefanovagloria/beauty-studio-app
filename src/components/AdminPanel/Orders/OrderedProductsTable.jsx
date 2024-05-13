import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button/Button";

import { styled } from "@mui/material/styles";

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

const OrderedproductsTable = ({ orderedProducts }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (orderedProducts && orderedProducts.length > 0) {
      setProducts(orderedProducts);
      console.log(orderedProducts)
    }
  }, [orderedProducts]);

  return (
    <TableContainer component={Paper}  style={{width: '550px'}}>
      <Table sx={{ width: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Име</TableCell>
            <TableCell align="center">Цена</TableCell>
            <TableCell align="center">Брой</TableCell>
            <TableCell align="center">Обща сума</TableCell>
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
              <TableCell align="center">Обща сума</TableCell>

              <TableCell align="center" sx={{ color: "white" }}>
                <CustomButton onClick={() => setOpenDetails(true)}>
                  Преглед{" "}
                </CustomButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderedproductsTable;
