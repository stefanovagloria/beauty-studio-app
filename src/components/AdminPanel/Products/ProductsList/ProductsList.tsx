import styles from "./ProductsList.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import image from "../../../../assets/productsImage.png";
import { Container, Grid } from "@mui/material";

const ProductsList = ({ products, selectProduct }) => {
  return (
    <Container>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={5}
        spacing={2}
        style={{ marginBottom: "50px", marginLeft: "50px" }}
      >
        {products.map((product) => (
          <Card
            className={styles.card}
            key={product._id}
            onClick={() => selectProduct(product)}
          >
            <CardMedia sx={{ height: 140 }} image={product.photos[0]} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsList;
