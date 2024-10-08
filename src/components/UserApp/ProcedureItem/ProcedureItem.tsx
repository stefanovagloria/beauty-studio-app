import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import React from "react";
import { Procedure } from "../../../models/procedure";

const ProcedureItem: React.FC<Procedure> = ({ _id, name, photos }) => {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <Link to={`/procedures/${_id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            width="auto"
            image={photos[0]}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ textAlign: "center" }}
            >
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>

      <CardActions>
        <Link to={"https://fashionpoint.bg/bg/embed-clinic-calendar/73"}>
          <Button size="small" color="primary">
            Запази час
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProcedureItem;
