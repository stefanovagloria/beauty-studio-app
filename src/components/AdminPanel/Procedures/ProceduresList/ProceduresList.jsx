import styles from "./ProceduresList.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import image from "../../../../assets/productsImage.png";
import { Grid, Container } from "@mui/material";

const ProceduresList = ({ procedures, setProcedure }) => {
  return (
    <Container>
    <Grid
      container
      rowSpacing={2}
      columnSpacing={5}
      spacing={2}
      style={{ marginBottom: "50px" }}
    >
      {procedures.map((procedure) => (
        <Card
          className={styles.card}
          key={procedure._id}
          onClick={() => setProcedure(procedure)}
        >
          <CardMedia sx={{ height: 140 }} image={image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {procedure.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {procedure.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Grid>
    </Container>
  );
};

export default ProceduresList;
