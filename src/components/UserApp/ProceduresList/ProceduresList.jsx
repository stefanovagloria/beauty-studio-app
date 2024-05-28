import { useEffect, useState } from "react";
import axios from "axios";

import ProcedureItem from "../ProcedureItem/ProcedureItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import styles from "./ProceduresList.module.css";

const ProceduresList = () => {
  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    const getProcedures = async () => {
      const response = await axios.get("http://localhost:4000/procedures");
      setProcedures(response.data);
    };

    getProcedures();
  }, []);

  return (
    <Box paddingLeft={7} marginTop={7} sx={{ flexGrow: 1 }} >
      <Grid container spacing={4}>
        {procedures &&
          procedures.map((p) => (
            <Grid item xs={4} key={p._id}>
              <ProcedureItem procedure={p}/>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ProceduresList;
