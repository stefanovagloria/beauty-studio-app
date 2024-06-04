import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import styles from "./ProcedureItem.module.scss";
import image from "../../../assets/procedures.png";

const ProcedureItem = ({ procedure }) => {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia component="img" height="300" width="auto" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{textAlign: 'center'}}>
            {procedure.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/book-appointment/procedures/${procedure._id}`}>
          <Button size="small" color="primary">
            Запази час
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProcedureItem;
