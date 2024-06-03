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
    <Box >
      <Grid container>
        {products &&
          products.map((p) => (
            <Grid item  key={p._id}>
              <ProductItem product={p} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ProductsList;
