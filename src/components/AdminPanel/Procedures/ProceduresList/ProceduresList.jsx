import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./ProceduresList.module.css";
import Card from "@mui/material/Card";

const ProceduresList = ({ procedures, setProcedure }) => {
  return (
    <div className={styles.container}>
      {procedures.map((procedure) => (
        <Card
          key={procedure._id}
          className={styles.btnContainer}
          onClick={() => setProcedure(procedure)}
        >
          <span className={styles.btn}>{procedure.name}</span>
        </Card>
      ))}
    </div>
  );
};

export default ProceduresList;
