import styles from "./ProductsList.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import image from "../../../../assets/productsImage.png";

const ProductsList = ({ products, selectProduct }) => {
  return (
    <>
      {products.map((p) => (
        <Card sx={{ maxWidth: 345 }} className={styles.card}>
          <CardMedia sx={{ height: 140 }} image={image}/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {p.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {p.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ProductsList;
