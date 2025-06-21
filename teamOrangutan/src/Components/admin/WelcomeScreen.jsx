import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { motion } from "framer-motion";

export const WelcomeScreen = ({ onFinish, adminName }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        bgcolor: "white",
        color: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3">Bienvenido</Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Typography variant="h4">{adminName}</Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Box mt={8}>
          <PropagateLoader color="#000" size={20} />
        </Box>
      </motion.div>
    </Box>
  );
};
