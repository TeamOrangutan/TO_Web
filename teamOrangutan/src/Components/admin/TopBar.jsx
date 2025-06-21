import { Box, Typography } from "@mui/material";

export const TopBar = ({selectedOption}) => {
  return (
    <>
      <Box
        sx={{
          height: "90px",
          bgcolor: "white",
          borderBottom: "1px solid #E0E0E0",
          display: "flex",
          alignItems: "center",
          px: 3,
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          zIndex: 10,
          position: "relative",
          top: -20,
          ml: "-25px",
          width: "100%",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#333" }}>
          {selectedOption}
        </Typography>
      </Box>
    </>
  );
};

export default TopBar;
