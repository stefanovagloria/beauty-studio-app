import { useEffect, useState } from "react";
import axios from "axios";

import ProductItem from "../ProductItem/ProductItem";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:4000/products");
      setProducts(response.data);
    };

    getProducts();
  }, []);

  return (
    <Box paddingLeft={7} marginTop={7} sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {products &&
          products.map((p) => (
            <Grid item xs={4} key={p._id}>
              <ProductItem product={p} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ProductsList;
