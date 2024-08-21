import { useEffect, useState } from "react";
import axios from "axios";

import ProcedureItem from "../ProcedureItem/ProcedureItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Procedure } from "../../../models/procedure";
import Loader from "../../Loader/Loader";

const ProceduresList = () => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);

  useEffect(() => {
    const getProcedures = async () => {
      const response = await axios.get(`http://localhost:4000/procedures`);
      setProcedures(response.data);
    };

    getProcedures();
  }, []);

  return (
    <>
      {procedures.length > 0 && (
        <Box paddingLeft={7} marginTop={7} sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} style={{ marginBottom: "100px" }}>
            {procedures &&
              procedures.map((p) => (
                <Grid item xs={4} key={p._id}>
                  <ProcedureItem {...p} />
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
      {procedures.length === 0 && <Loader/>}
    </>
  );
};

export default ProceduresList;
