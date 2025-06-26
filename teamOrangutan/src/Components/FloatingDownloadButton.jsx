import { Fab, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";
import { useLocation } from "react-router-dom";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
export const FloatingDownloadButton = () => {
  const handleDownload = () => {
    const isAdmin = location.pathname.includes("/admin");
    const filePath = isAdmin ? "/ManualAdmin.pdf" : "/ManualClientes.pdf";
    const fileName = isAdmin ? "manual-admin.pdf" : "manual-usuario.pdf";
    saveAs(filePath, fileName);
  };

  return (
    <Tooltip title="Descargar Manual de Usuario">
      <Fab
        aria-label="descargar"
        onClick={handleDownload}
        size="small"
        sx={{
          position: "fixed",
          bottom: 284,
          right: 24,
          zIndex: 9999,
        }}
      >
        <QuestionMarkOutlinedIcon />
      </Fab>
    </Tooltip>
  );
};

export default FloatingDownloadButton;
