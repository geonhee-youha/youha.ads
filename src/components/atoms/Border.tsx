import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Border() {
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          flex: 1,
          position: "relative",
          height: `1px`,
          minWidth: 80,
          "@media(max-width: 480px)": {
            minWidth: 24,
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "100%",
            right: 0,
            bottom: 0,
            background: grey[800],
            transition: "all 1s ease",
          }}
          className="BorderLeft"
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: `1280px`,
          height: `1px`,
          background: grey[800],
          transition: "all 1s ease",
        }}
        className="BorderCenter"
      />
      <Box
        sx={{
          flex: 1,
          position: "relative",
          height: `1px`,
          minWidth: 80,
          "@media(max-width: 480px)": {
            minWidth: 24,
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: "100%",
            bottom: 0,
            background: grey[800],
            transition: "all 1s ease",
          }}
          className="BorderRight"
        />
      </Box>
    </Box>
  );
}
