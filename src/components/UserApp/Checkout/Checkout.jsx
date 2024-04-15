import { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import OrderTable from "../OrderTable/OrderTable";

const Checkout = () => {
  const [orderedProducts, setOrderedProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    city: "",
    street: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    const orderedProductsArr = localStorage.getItem("orderedItems");
    let orderedItems = orderedProductsArr ? JSON.parse(orderedProductsArr) : [];
    setOrderedProducts(orderedItems);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    console.log(orderedProducts);
  };

  return (
    <Container style={{ display: "flex", flexDirection: "row", }}>
      <Container sx={{ minWidth: 650 }} >
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
              value={formData.name}
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
              value={formData.surname}
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
            value={formData.city}
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
              value={formData.street}
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
              value={formData.phoneNumber}
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
              value={formData.email}
              onChange={handleChange}
              fullWidth={false}
              margin="normal"
              required
              style={{ width: "29em" }}
            />
          </div>
          <div>
            <Button type="submit" variant="contained" color="secondary">
              Поръчване
            </Button>
          </div>
        </form>
      </Container>
      <Container>
        <Typography variant="h4" gutterBottom>
          Вашата поръчка
        </Typography>
        <OrderTable products={orderedProducts}/>
      </Container>
    </Container>
  );
};

export default Checkout;
