import { useEffect, useState } from "react";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OrderItem from "./OrderItem";

const Orders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() =>{
        const getOrders = async() =>{
            const response = await axios.get("http://localhost:4000/admin/orders");
            setOrders(response.data);
            console.log(response.data)
        }

        getOrders();
    },[])

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
    <TableContainer component={Paper} sx={{ width: 750}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Статус</TableCell>
            <TableCell align="center">Дата</TableCell>
            <TableCell align="center">Стойност</TableCell>
            <TableCell align="center">Номер</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <OrderItem key={order._id} order={order}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default Orders;
