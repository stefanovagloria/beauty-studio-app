import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./ProcedureItemDetails.module.scss";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import image from "../../../assets/productsImage.png";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgb(148, 72, 220)",
  maxWidth: "15em",
  color: "white",
  padding: "1em 1.5em",
  margin: "0em 0.7em",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgb(190, 90, 220)",
  },
}));

const relatedProducts = [
  "Хидратиращ крем",
  "Хидратиращ крем",
  "Хидратиращ крем",
  "Хидратиращ крем",
];

const ProcedureItemDetails = () => {
  const { id } = useParams();
  const [procedure, setProcedure] = useState({});

  useEffect(() => {
    const getProcedure = async () => {
      const response = await axios.get(
        `http://localhost:4000/procedures/byId/${id}`
      );
      setProcedure(response.data);
    };
    getProcedure();
  }, []);

  return (
    <div className={styles.container}>
      <h1>{procedure.name}</h1>
      <img className={styles.procedureImg} src={image} />
      <div className={styles.buttons}>
        <CustomButton>Закупи</CustomButton>
        <CustomButton>Запази час</CustomButton>
      </div>
      <div>
        <p className={styles.description}>{procedure.description}</p>
      </div>
      {relatedProducts && (
        <div className={styles.relatedProducts}>
          <h3>Подходящи продукти</h3>
          <div className={styles.imgContainer}>
            {relatedProducts.map((p, index) => (
              <img key={index} src={image} className={styles.img} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcedureItemDetails;
