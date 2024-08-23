import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const LinearLoader = () => {
  return (
    <Box sx={{ width: "100%"}}>
      <LinearProgress color="secondary" sx={{ display: "flex",  justifyContent: "center", alignItems: "center"}}/>
    </Box>
  );
}

export default LinearLoader;
