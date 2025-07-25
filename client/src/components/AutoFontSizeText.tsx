import React, { useLayoutEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

const AutoFontSizeText = ({
  children,
  minFontSize = 10,
  maxFontSize = 300,
  style = {},
  multiline = false,
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(minFontSize);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(() => resizeText());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const resizeText = () => {
      const container = containerRef.current;
      const text = textRef.current;
      if (!container || !text) return;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      let low = minFontSize;
      let high = maxFontSize;
      let bestFit = low;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = `${mid}px`;

        const { scrollWidth, scrollHeight } = text;

        const fitsWidth = scrollWidth <= containerWidth;
        const fitsHeight = scrollHeight <= containerHeight;

        if (fitsWidth && fitsHeight) {
          bestFit = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      setFontSize(bestFit);
    };

    resizeText();
    return () => resizeObserver.disconnect();
  }, [children, minFontSize, maxFontSize]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Typography
        ref={textRef}
        sx={{
          fontSize: `${fontSize}px`,
          lineHeight: 1.2,
          textAlign: "center",
          whiteSpace: multiline ? "normal" : "nowrap",
          wordBreak: "break-word",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default AutoFontSizeText;
