import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Toolbar({ children }: { children?: React.ReactNode }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: 64,
        display: "flex",
        alignItems: "center",
      }}
      className="Toolbar"
    >
      {children}
    </Box>
  );
}
