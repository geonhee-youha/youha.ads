import { ButtonBase, SxProps } from "@mui/material";
import React from "react";
import { mainColor, theme } from "../../themes/theme";

export default function Button({
  children,
  onClick,
  sx,
  className,
}: {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  sx?: SxProps;
  className?: string | undefined;
}) {
  return (
    <ButtonBase
      sx={{
        width: "100%",
        background: mainColor[500],
        color: "#ffffff",
        height: 44,
        fontSize: 16,
        lineHeight: "24px",
        fontWeight: "700",
        borderRadius: 0.5,
        justifyContent: "center",
        alignItems: "center",
        p: theme.spacing(0, 2.5),
        ...sx,
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
}
