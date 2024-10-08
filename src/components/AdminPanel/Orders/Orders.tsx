import { useEffect, useState } from "react";
import axios from "axios";

import OrderItem from "./OrderItem";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Order } from "../../../models/order";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get("http://localhost:4000/orders");
      setOrders(response.data);
      console.log(response.data)
    };

    getOrders();
  }, []);

  const updateOrder = (orderId: string) => {
    const orderIndex = orders.findIndex((o) => o._id === orderId);
    const updatedOrders = orders;
    updatedOrders[orderIndex]["status"] = "изпратена";

    setOrders(updatedOrders);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <TableContainer component={Paper}  style={{marginBottom: "2em", width: "750px"}}>
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
              <OrderItem
                key={order._id}
                order={order}
                updateOrder={updateOrder}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
