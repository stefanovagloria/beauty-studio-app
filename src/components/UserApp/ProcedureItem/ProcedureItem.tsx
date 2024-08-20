import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import image from "../../../assets/procedures.png";
import React from "react";
import { Procedure } from "../../../models/procedure";

const ProcedureItem: React.FC<Procedure> = ({ _id, name }) => {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia component="img" height="300" width="auto" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{textAlign: 'center'}}>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/book-appointment/procedures/${_id}`}>
          <Button size="small" color="primary">
            Запази час
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProcedureItem;
