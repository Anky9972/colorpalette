import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import chroma from "chroma-js";
import { GoDotFill } from "react-icons/go";
import nearestColor from "nearest-color";
import colorNameList from "color-name-list";

function QuickView({ quickview, setQuickview, selectedColors }) {
  const [viewColor, setViewColor] = useState("");
  const [rgb, setRgb] = useState("");
  const [hex, setHex] = useState("");
  const [hslColor, setHslColor] = useState([]);
  const [hsvColor, setHsvColor] = useState([]);
  const [cmykColor, setCmykColor] = useState([]);
  const [labColor, setLabColor] = useState([]);
  const [colorName, setColorName] = useState("Unknown");
  const [selectedDotIndex, setSelectedDotIndex] = useState(0); // Set initial index to 0

  const formattedHsvColor = hsvColor.map(value => value.toFixed(3)).join(", ");
  const formattedHslColor = hslColor.map(value => value.toFixed(3)).join(", ");
  const formattedCmykColor = cmykColor.map(value => value.toFixed(3)).join(", ");
  const formattedLabColor = labColor.map(value => value.toFixed(3)).join(", ");

  // Calculate luminance and default to black if viewColor is invalid
  const luminance = viewColor && chroma.valid(viewColor)
    ? chroma.contrast("black", viewColor) > chroma.contrast("white", viewColor)
      ? "black"
      : "white"
    : "black";

  const generateColors = () => {
    if (!chroma.valid(viewColor)) return; // Ensure viewColor is valid

    const rgbValues = viewColor.match(/\d+/g).map(Number);
    const chromaColor = chroma.rgb(rgbValues);

    setHslColor(chromaColor.hsl());
    setHsvColor(chromaColor.hsv());
    setCmykColor(chromaColor.cmyk());
    setLabColor(chromaColor.lab());
    setRgb(`rgb(${rgbValues.join(", ")})`);
    setHex(chromaColor.hex());

    const nearestColorName = getColorName(chromaColor.hex());
    setColorName(nearestColorName);
  };

  useEffect(() => {
    if (viewColor) generateColors();
  }, [viewColor]);

  useEffect(() => {
    if (selectedColors.length > 0) {
      setViewColor(selectedColors[0].rgb);
    }
  }, [selectedColors, setViewColor]);

  const colorsMap = colorNameList.reduce((acc, color) => {
    acc[color.name] = color.hex;
    return acc;
  }, {});

  const nearest = nearestColor.from(colorsMap);
  function getColorName(hexColor) {
    const colorName = nearest(hexColor);
    return colorName ? colorName.name : "Unknown";
  }

  return (
    <div className="w-full h-screen z-50 left-0 top-0 flex justify-center items-center bg-slate-950 bg-opacity-40 absolute">
      <div className="w-full md:max-w-sm mt-8 rounded-xl bg-white overflow-hidden flex flex-col">
        <div className="w-full h-16 flex justify-center items-center relative">
          <span
            className="absolute left-1 rounded-lg p-1 hover:bg-slate-100 flex justify-center items-center hover:cursor-pointer"
            onClick={() => setQuickview(!quickview)}
          >
            <IoCloseSharp className="text-xl" />
          </span>
          <div className="w-full flex justify-center items-center">
            <h1 className="font-bold">Quick view</h1>
          </div>
        </div>
        <div
          className="w-full h-full p-2"
          style={{ backgroundColor: viewColor }}
        >
          <div className="w-full p-2">
            <div className="text-xs font-bold" style={{ color: luminance }}>HEX</div>
            <div className="text-sm font-extrabold" style={{ color: luminance }}>{hex}</div>
          </div>
          <div className="w-full p-2">
            <div className="text-xs font-bold" style={{ color: luminance }}>HSB</div>
            <div className="text-sm font-extrabold" style={{ color: luminance }}>{formattedHsvColor}</div>
          </div>
          <div className="w-full p-2">
            <div className="text-xs font-bold" style={{ color: luminance }}>HSL</div>
            <div className="text-sm font-extrabold" style={{ color: luminance }}>{formattedHslColor}</div>
          </div>
          <div className="w-full p-2">
            <div className="text-xs font-bold" style={{ color: luminance }}>RGB</div>
            <div className="text-sm font-extrabold" style={{ color: luminance }}>{rgb}</div>
          </div>
          <div className="w-full p-2">
            <div className="text-xs font-bold" style={{ color: luminance }}>CMYK</div>
            <div className="text-sm font-extrabold" style={{ color: luminance }}>{formattedCmykColor}</div>
          </div>
          <div className="w-full p-2">
            <div className="text-xs font-bold" style={{ color: luminance }}>LAB</div>
            <div className="text-sm font-extrabold" style={{ color: luminance }}>{formattedLabColor}</div>
          </div>
          <div className="w-full p-2">
            <div className="text-xs font-bold" style={{ color: luminance }}>NAME</div>
            <div className="text-sm font-extrabold" style={{ color: luminance }}>{colorName}</div>
          </div>
        </div>
        <div className="w-full h-32 flex justify-center items-center px-6">
          <div className="w-full rounded-xl overflow-hidden flex flex-row justify-center">
            {selectedColors.map((color, index) => (
              <div
                key={index}
                style={{ backgroundColor: color.rgb }}
                onClick={() => {
                  setViewColor(color.rgb);
                  setSelectedDotIndex(index);
                }}
                className="w-1/5 h-12 flex justify-center items-center cursor-pointer"
              >
                {selectedDotIndex === index && <GoDotFill style={{ color: luminance }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickView;
