import React, { useLayoutEffect, useRef, useState } from "react";

const AutoFontSizeText = ({
  children,
  maxFontSize = 100,
  minFontSize = 10,
  style = {},
  ...rest
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(minFontSize);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    const resizeObserver = new ResizeObserver(() => {
      const { offsetWidth: cw, offsetHeight: ch } = container;

      let low = minFontSize;
      let high = maxFontSize;
      let best = low;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = `${mid}px`;

        const fits = text.scrollWidth <= cw && text.scrollHeight <= ch;

        if (fits) {
          best = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      setFontSize(best);
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [children]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      <div
        ref={textRef}
        style={{
          fontSize,
          fontWeight: "bold",
          whiteSpace: "nowrap",
          whiteSpace: "normal",
          wordBreak: "break-word",
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AutoFontSizeText;
