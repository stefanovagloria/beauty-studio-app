import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import image from "../../../assets/procedures.png";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  const navigateToDetailsPage = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card >
      <CardActionArea onClick={navigateToDetailsPage}>
        <CardMedia component="img" height="300" width="auto" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductItem;
