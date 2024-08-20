import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./ProcedureItemDetails.module.scss";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import image from "../../../assets/productsImage.png";
import { Procedure } from "../../../models/procedure";

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

const ProcedureItemDetails = () => {
  const { id } = useParams();
  const [procedure, setProcedure] = useState<Procedure | null>(null);

  useEffect(() => {
    const getProcedure = async () => {
      const response = await axios.get(
        `http://localhost:4000/procedures/byId/${id}`
      );
      setProcedure(response.data);
    };
    getProcedure();
  }, [id]);

  return (
    <>
      {procedure && (
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
          {procedure && procedure.relatedProducts.length > 0 && (
            <div className={styles.relatedProducts}>
              <h3>Подходящи продукти</h3>
              <div className={styles.subContainer}>
                {procedure &&
                  procedure.relatedProducts &&
                  procedure.relatedProducts.map((p, index) => (
                    <div className={styles.imgContainer} key={index}>
                      <Link to={`/procedures/${p._id}`}>
                        <img src={image} className={styles.img} />
                        <div className={styles.overlayText}>{p.name}</div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProcedureItemDetails;
