import { useState, useEffect } from "react";

export const useGetColorLuminance = (hexColor: string) => {
  const [buttonColor, setButtonColor] = useState("text-white");

  useEffect(() => {
    const luminance = getLuminanceFromHex(hexColor);
    setButtonColor(luminance < 128 ? "text-white" : "text-black");
  }, [hexColor]);

  const getLuminanceFromHex = (hex: string) => {
    let cleanedHex = hex.replace("#", "");

    if (cleanedHex.length === 3) {
      cleanedHex = cleanedHex
        .split("")
        .map((char) => char + char)
        .join("");
    }

    const r = parseInt(cleanedHex.substring(0, 2), 16);
    const g = parseInt(cleanedHex.substring(2, 4), 16);
    const b = parseInt(cleanedHex.substring(4, 6), 16);

    return 0.299 * r + 0.587 * g + 0.114 * b;
  };

  return buttonColor;
};
