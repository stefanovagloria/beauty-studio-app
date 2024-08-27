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
import { Product } from "../../../models/product";
import Loader from "../../Loader/Loader";

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const navigateToDetailsPage = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(`http://localhost:4000/products`);
      setProducts(response.data);
    };

    getProducts();
  }, []);

  return (
    <>
      {products.length > 0 && (
        <Box paddingLeft={7} marginTop={7} sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} style={{ marginBottom: "100px" }}>
            {products &&
              products.map((product) => (
                <Grid item xs={4} key={product._id}>
                  <Card>
                    <CardActionArea
                      onClick={() => navigateToDetailsPage(product._id)}
                    >
                      <CardMedia
                        component="img"
                        height="300"
                        width="auto"
                        image={product.photos[0]}
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
      )}
      {products.length === 0 && <Loader/>}
    </>
  );
};

export default ProductsList;
