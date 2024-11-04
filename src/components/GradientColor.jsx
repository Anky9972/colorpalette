import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { ColorState } from "../context/ColorState";
import Tool from "./Tool";
import ToolsMenu from "./tools/ToolsMenu";

const GradientColor = () => {
  const [colors, setColors] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [mobileTool, setMobileTool] = useState(false);
  const { menu } = useContext(ColorState);

  const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth >= 768); // 768px is the md breakpoint

  const generateRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const generatePalette = () => {
    const newColors = [];
    for (let i = 0; i < 5; i++) {
      const color1 = generateRandomColor();
      const color2 = generateRandomColor();
      const gradientDirection = isMediumScreen ? "to bottom" : "to right"; // Change direction based on screen size
      const gradient = `linear-gradient(${gradientDirection}, ${color1}, ${color2})`;
      newColors.push(gradient);
    }
    setColors(newColors);
  };

  const handleCopyCode = (index) => {
    navigator.clipboard.writeText(colors[index]);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
    toast.success("Gradient copied to clipboard!");
  };

  useEffect(() => {
    generatePalette();
  }, [isMediumScreen]); // Regenerate palette when screen size changes

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleGenerateButtonClick() {
    generatePalette();
    const event = new KeyboardEvent("keydown", { keyCode: 32 });
    document.body.dispatchEvent(event);
  }
  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobileTool(true);
    }
  }, [window.innerWidth]);

  return (
    <div className="w-full h-full flex flex-col">
      {
        !mobileTool &&
      <Tool />
      }

      <div className="bg-black flex w-full h-full flex-col md:flex-row">
        <div className="md:hidden w-full absolute bottom-0">
          <button
            className="w-full h-12 bg-black text-white"
            onClick={handleGenerateButtonClick}
          >
            Generate
          </button>
        </div>
        {colors.map((color, index) => (
          <motion.div
            key={index}
            className="flex-1 w-full h-full relative"
            style={{ background: color }}
            onClick={() => handleCopyCode(index)}
          ></motion.div>
        ))}
        {menu && <ToolsMenu />}
      </div>
      {
        mobileTool &&
      <Tool />
      }
    </div>
  );
};

export default GradientColor;
