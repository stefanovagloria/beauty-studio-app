import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        position: "fixed", // Fixed positioning to overlay the whole screen
        top: 0,
        left: 0,
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: semi-transparent background
        zIndex: 9999, // Ensures loader is on top of other content
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
