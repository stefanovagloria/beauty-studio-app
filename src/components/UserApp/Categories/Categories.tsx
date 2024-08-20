import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import { Grid, Container, CssBaseline } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import styles from "./Categories.module.scss";
import image from "../../../assets/productsImage.png";
import { Procedure } from "../../../models/procedure";

const Categories = () => {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    const getProcedures = async () => {
      const [proceduresResponse, categoryResponse] = await Promise.all([
        axios.get(`http://localhost:4000/procedures/${id}`),
        axios.get(`http://localhost:4000/categories/${id}`),
      ]);
      setProcedures(proceduresResponse.data);
      setCategory(categoryResponse.data.name);
    };

    getProcedures();
  }, [id]);

  return (
    <div className={styles.categoriesContainer}>
      <h2 className={styles.title}>Категория - {category}</h2>
      <Container>
      <CssBaseline />
        <Grid
          container
          rowSpacing={5}
          columnSpacing={5}
          style={{marginBottom: "50px"}}
        >
          {procedures &&
            procedures.map((p: Procedure) => (
              <Grid
                key={p._id}
                item
                xs={12}
                sm={6}
                md={4}
                style={{ height: "100%" }}
              >
                <Link to={`/procedures/${p._id}`}>
                  <Card sx={{ maxWidth: 345 }} className={styles.card}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={image}
                      title={p.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {p.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Categories;
