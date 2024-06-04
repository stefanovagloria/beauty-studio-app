import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import image from "../../../assets/procedures.png";
import { Box } from "@mui/material";

import Grid from "@mui/material/Grid";
import styles from "./ProductsList.module.scss";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const navigateToDetailsPage = () => {
    navigate(`/products/${product._id}`);
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(`http://localhost:4000/products`);
      setProducts(response.data);
    };

    getProducts();
  }, []);

  return (
    <Box paddingLeft={7} marginTop={7} sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        {products &&
          products.map((product) => (
            <Grid item xs={4} key={product._id}>
              <Card>
                <CardActionArea onClick={navigateToDetailsPage}>
                  <CardMedia
                    component="img"
                    height="300"
                    width="auto"
                    image={image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ProductsList;
