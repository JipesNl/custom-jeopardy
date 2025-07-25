// components/GameCard.tsx
import React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import AutoFontSizeText from "./AutoFontSizeText";

interface GameCardProps {
  children: React.ReactNode;
  available?: boolean;
  onClick?: () => void;
  isHeader?: boolean;
  sx?: SxProps<Theme>;
}

const GameCard: React.FC<GameCardProps> = ({
  children,
  available = true,
  onClick,
  isHeader = false,
  sx = {},
}) => {
  return (
    <Box
      onClick={available && !isHeader ? onClick : undefined}
      sx={{
        flex: "1 1 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isHeader
          ? "background.paper"
          : available
            ? "background.paper"
            : "#ccc",
        color: isHeader
          ? "text.primary"
          : available
            ? "secondary.main"
            : "#666",
        fontWeight: "bold",
        fontSize: isHeader ? "1rem" : "clamp(1rem, 2vw, 2rem)",
        textAlign: "center",
        textTransform: isHeader ? "uppercase" : "none",
        padding: 1,
        overflow: "hidden",
        whiteSpace: isHeader ? "normal" : "nowrap",
        wordBreak: "break-word",
        cursor: isHeader ? "default" : available ? "pointer" : "not-allowed",
        minHeight: 0,
        ...sx,
      }}
    >
      {isHeader ? <AutoFontSizeText>{children}</AutoFontSizeText> : children}
    </Box>
  );
};

export default GameCard;
