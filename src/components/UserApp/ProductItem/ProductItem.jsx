import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, TextField } from "@mui/material";

import styles from "./ProductItem.module.css";
import image from "../../../assets/procedures.png";

const ProductItem = ({ product, addProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddProduct = () => {
    addProduct(product, quantity);
  };

  const navigateToDetailsPage = () =>{
    navigate(`/products/${product._id}`);
  }

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea onClick={navigateToDetailsPage}>
        {" "}
        <CardMedia component="img" height="300" width="auto" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions className={styles.container}>
        <TextField
          className={styles.inputField}
          id="outlined-number"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          value={quantity}
          onChange={handleQuantityChange}
        />
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={styles.btn}
          onClick={handleAddProduct}
        >
          Купи
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
