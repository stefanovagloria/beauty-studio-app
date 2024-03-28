import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./ProceduresList.module.css";
import Card from "@mui/material/Card";

const ProceduresList = ({ id }) => {

  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    const getProcedure = async () => {
      const response = await axios.get(
        `http://localhost:4000/admin/procedures/${id}`
      );

      setProcedures(response.data);
      console.log(response.data);
    };

    getProcedure();
  }, [id]);

  return (
    <div className={styles.container}>
      {procedures.map((procedure) => (
        <Card key={procedure._id} className={styles.btnContainer}>
          <span className={styles.btn}>Procedure</span>
        </Card>
      ))}
    </div>
  );
};

export default ProceduresList;
