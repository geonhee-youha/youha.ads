import { Box, SxProps } from "@mui/material";
import React from "react";
import { theme } from "../../themes/theme";

export default function Container({
  children,
  sx,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  sx?: SxProps;
  className?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}) {
  return (
    <Box
      sx={{
        m: theme.spacing(0, "auto"),
        p: theme.spacing(0, 10),
        width: "100%",
        maxWidth: 1440,
        transition: `all 0.35s ease`,
        "@media(max-width: 480px)": {
          p: theme.spacing(0, 3),
        },
        ...sx,
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </Box>
  );
}
