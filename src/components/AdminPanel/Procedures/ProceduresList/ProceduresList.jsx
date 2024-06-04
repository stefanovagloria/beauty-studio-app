import styles from "./ProceduresList.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import image from "../../../../assets/productsImage.png";

const ProceduresList = ({ procedures, setProcedure }) => {
  return (
    <>
      {procedures.map((procedure) => (
        <Card className={styles.card} key={procedure._id} onClick={() => setProcedure(procedure)}>
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
    </>
  );
};

export default ProceduresList;
