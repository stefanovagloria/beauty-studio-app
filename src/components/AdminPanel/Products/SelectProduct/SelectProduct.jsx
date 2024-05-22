import styles from "./SelectProduct.module.css";
import image from "../../../../assets/productsImage.png";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SelectProduct = ({ show, hide, addToRelatedProducts }) => {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:4000/admin/products");

      setProducts(() => response.data);
      setFilteredProducts(() => response.data);
    };

    getProducts();
  }, []);

  useEffect(() => {
    const updatedProducts = products.filter((p) =>
      p.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredProducts(updatedProducts);
  }, [input]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onItemSelect = (product) => {
    addToRelatedProducts(product);
  };

  return (
    <Dialog
      open={show}
      onClose={hide}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        style: {
          position: "absolute",
          right: 0,
          margin: 0,
          width: "400px", // Custom width
          maxWidth: "400px", // Custom max-width
          height: "430px",
          maxHeight: "430px",
        },
      }}
    >
      <DialogContent>
        <div className={styles.inputContainer}>
          <input
            type="text"
            onChange={onInputChange}
            className={styles.input}
          />
        </div>

        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
          >
            {filteredProducts.map((p) => (
              <Grid item xs={12} sm={6} key={p.id} className={styles.container}>
                <Item onClick={() => onItemSelect(p)} className={styles.item}>
                  <img className={styles.img} src={image} alt={p.name} />
                  <p>{p.name}</p>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SelectProduct;
