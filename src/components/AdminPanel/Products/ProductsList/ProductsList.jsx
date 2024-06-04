import styles from "./ProductsList.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import image from "../../../../assets/productsImage.png";

const ProductsList = ({ products, selectProduct }) => {
  return (
    <>
      {products.map((product) => (
        <Card
          className={styles.card}
          key={product._id}
          onClick={() => selectProduct(product)}
        >
          <CardMedia sx={{ height: 140 }} image={image} />
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
    </>
  );
};

export default ProductsList;
