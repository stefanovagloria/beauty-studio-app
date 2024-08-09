import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { TextField, Button, Container, Typography } from "@mui/material";
import OrderTable from "../OrderTable/OrderTable";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Checkout = () => {

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    city: "",
    street: "",
    phoneNumber: "",
    email: "",
  });
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const products = orderedProducts.map((p) => ({
      name: p.name,
      price: p.price,
      product: p._id,
      quantity: p.quantity,
    }));

    const date = Date.now();
    const orderData = {
      user: userData,
      products: products,
      totalPrice: totalPrice,
      date: date,
      status: "нова",
    };

    const response = await axios.post(
      "http://localhost:4000/orders/checkout",
      orderData
    );

    localStorage.clear();

    handleClick();

    setTimeout(() => navigate("/"), 6000);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container
      style={{ display: "flex", flexDirection: "row", marginBottom: "30px" }}
    >
      <Container sx={{ minWidth: 650 }}>
        <Typography variant="h4" gutterBottom>
          Фактуриране и доставка
        </Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Име"
              variant="outlined"
              color="secondary"
              size="small"
              name="name"
              value={userData.name}
              onChange={handleChange}
              fullWidth={false}
              margin="normal"
              required
              style={{ paddingRight: "1em" }}
            />
            <TextField
              label="Фамилия"
              variant="outlined"
              color="secondary"
              size="small"
              fullWidth={false}
              name="surname"
              value={userData.surname}
              onChange={handleChange}
              margin="normal"
              required
            />
          </div>
          <TextField
            label="Град"
            variant="outlined"
            color="secondary"
            name="city"
            size="small"
            value={userData.city}
            onChange={handleChange}
            fullWidth={false}
            margin="normal"
            required
            style={{ width: "29em" }}
          />
          <div>
            <TextField
              label="Улица и квартал"
              variant="outlined"
              color="secondary"
              name="street"
              size="small"
              value={userData.street}
              onChange={handleChange}
              fullWidth={false}
              margin="normal"
              required
              style={{ width: "29em" }}
            />
          </div>
          <div>
            <TextField
              label="Телефон"
              variant="outlined"
              color="secondary"
              name="phoneNumber"
              size="small"
              value={userData.phoneNumber}
              onChange={handleChange}
              fullWidth={false}
              margin="normal"
              required
              style={{ width: "29em" }}
            />
          </div>
          <div>
            <TextField
              label="Имейл адрес"
              variant="outlined"
              name="email"
              size="small"
              value={userData.email}
              onChange={handleChange}
              fullWidth={false}
              margin="normal"
              required
              style={{ width: "29em" }}
            />
          </div>
          <div>
            <Button type="submit" variant="contained" color="secondary"  style={{ marginRight: '8px' }}>
              Поръчване
            </Button>
            <Link to='/shopping-cart'>
            <Button variant="contained" color="secondary">
              Коригирай поръчката   <ArrowForwardIcon style={{ textAlign: 'right' }}/>
            </Button>
            </Link>
          </div>
        </form>
      </Container>
      <Container>
        <Typography variant="h4" gutterBottom>
          Вашата поръчка
        </Typography>
        <OrderTable />
      </Container>
      <Container>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          style={{ marginTop: "70px" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Вашата поръчка беше изпратена успешно!
          </Alert>
        </Snackbar>
      </Container>
    </Container>
  );
};

export default Checkout;
