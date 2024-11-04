// src/components/ColorContrastChecker.js

import React, { useState } from "react";
import { CiMaximize1 } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { mirrorEasing, motion } from "framer-motion";

const ColorContrastChecker = () => {
  const [bgColor, setBgColor] = useState("#ACC8E5");
  const [textColor, setTextColor] = useState("#112A46");
  const [bgColorInput, setBgColorInput] = useState("#ACC8E5");
  const [textColorInput, setTextColorInput] = useState("#112A46");
  const [contrastRatio, setContrastRatio] = useState(8.42);
  const [max, setMax] = useState(false);

  const getLuminance = (rgb) => {
    const a = rgb.map((color) => {
      color /= 255;
      return color <= 0.03928
        ? color / 12.92
        : Math.pow((color + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  };

  const getContrastRatio = (color1, color2) => {
    const [r1, g1, b1] = hexToRgb(color1);
    const [r2, g2, b2] = hexToRgb(color2);
    const l1 = getLuminance([r1, g1, b1]);
    const l2 = getLuminance([r2, g2, b2]);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };

  const hexToRgb = (hex) => {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
  };

  const rgbToHex = (r, g, b) => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  };

  const handleColorChange = (e, type) => {
    const value = e.target.value;
    if (type === "bg") {
      setBgColorInput(value);
      setBgColor(value);
    } else {
      setTextColorInput(value);
      setTextColor(value);
    }
  };

  const handleCheckContrast = () => {
    const ratio = getContrastRatio(bgColor, textColor).toFixed(2);
    setContrastRatio(ratio);
  };

  const getContrastDetails = (ratio, isLargeText) => {
    const threshold = isLargeText ? 3 : 4.5; 
    const isAccessible = ratio >= threshold;
    return {
      rating: isAccessible ? "Accessible" : "Not Accessible",
      color: isAccessible
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800",
      stars: isAccessible ? 5 : 0, 
    };
  };


  const renderStars = (stars) => {
    return Array.from({ length: stars }, (_, i) => (
      <span key={i} className="text-yellow-500">
        &#9733;
      </span>
    ));
  };


  const getAccessibilityMessage = () => {
    if (!contrastRatio) return "";
    return contrastRatio >= 4.5
      ? "The color combination is accessible for normal text."
      : "The color combination is not accessible for normal text.";
  };

  const contrastDetailsSmall = contrastRatio
    ? getContrastDetails(contrastRatio, false)
    : {};
  const contrastDetailsLarge = contrastRatio
    ? getContrastDetails(contrastRatio, true)
    : {};

  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-10">
      <div className="w-full flex flex-col items-center justify-center gap-5 p-10">
        <div className="text-4xl font-extrabold">Color Contrast Checker</div>
        <div className="text-gray-500 font-medium">
          Check the contrast ratio of text and background colors.
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-6 md:mb-0 md:mr-4 p-6">
          <div className="flex gap-5 items-center">
            {/* Background Color Input */}
            <div className="mb-4 relative">
              <label className="block text-xs font-semibold mb-1">
                Background Color:
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => {
                  setBgColor(e.target.value);
                  setBgColorInput(e.target.value);
                }}
                className="absolute right-0 w-5 h-5 rounded z-10"
              />
              <input
                type="text"
                value={bgColorInput}
                onChange={(e) => handleColorChange(e, "bg")}
                placeholder="Enter HEX or RGB"
                className="w-full p-2 border rounded-lg text-xs"
              />
            </div>

            {/* Text Color Input */}
            <div className="mb-4 relative">
              <label className="block text-xs font-semibold mb-1">
                Text Color:
              </label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => {
                  setTextColor(e.target.value);
                  setTextColorInput(e.target.value);
                }}
                className="absolute right-2 top-7 w-8 h-8 outline-none border-none rounded z-10"
              />
              <input
                type="text"
                value={textColorInput}
                onChange={(e) => handleColorChange(e, "text")}
                placeholder="Enter HEX or RGB"
                className="w-full p-2 border rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Contrast Result Section */}
          <div className="mt-2 rounded-lg text-center">
            <h1 className="w-full flex justify-start text-xs font-semibold">
              Contrast:
            </h1>
            {contrastRatio ? (
              <>
                <div className="rounded-xl overflow-hidden mt-1">
                  <div className="text-5xl font-bold text-green-600 w-full p-4 bg-green-100">
                    {contrastRatio}
                  </div>
                  <div className="mt-1 flex w-full gap-1">
                    <div
                      className={`flex justify-between items-center p-4 ${contrastDetailsSmall.color} w-full`}
                    >
                      <p className="text-sm font-semibold">Small Text</p>
                      <div className="flex flex-col justify-center mt-1">
                        <p className="text-xs">{contrastDetailsSmall.rating}</p>
                        <span>{renderStars(contrastDetailsSmall.stars)}</span>
                      </div>
                    </div>
                    <div
                      className={`flex justify-between items-center p-4 ${contrastDetailsLarge.color} w-full`}
                    >
                      <p className="text-sm font-semibold">Large Text</p>
                      <div className="flex flex-col justify-center mt-1">
                        <p className="text-xs">{contrastDetailsLarge.rating}</p>
                        <span>{renderStars(contrastDetailsLarge.stars)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {getAccessibilityMessage()}
                </p>
              </>
            ) : (
              <p className="text-md text-gray-600">
                Check contrast to see result
              </p>
            )}
            <button
              onClick={handleCheckContrast}
              className=" w-full mt-5 bg-black text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-200"
            >
              Check Contrast
            </button>
          </div>
        </div>

        {/* Quote Section */}
        {max && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0", top: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full fixed left-0 h-full z-10 flex flex-col justify-center items-center"
            style={{ backgroundColor: bgColor }}
          >
            <span
              className="absolute right-2 top-2 p-1 bg-gray-100 rounded-md border cursor-pointer "
              onClick={() => setMax(!max)}
            >
              <IoCloseSharp />
            </span>
            <h2
              className="text-2xl font-semibold mb-2"
              style={{ color: textColor }}
            >
              Quote
            </h2>
            <p
              className="text-sm text-center mb-4"
              style={{ color: textColor }}
            >
              Everyone is a genius at least once a year. The real geniuses
              simply have their bright ideas closer together.
            </p>
            <p className="text-sm font-semibold" style={{ color: textColor }}>
              Georg Christoph Lichtenberg
            </p>
          </motion.div>
        )}
        <div
          className="w-full md:w-1/2 p-6 rounded-r-xl flex flex-col justify-center items-center relative"
          style={{ backgroundColor: bgColor }}
        >
          <span
            className="absolute right-2 top-2 p-1 cursor-pointer "
            onClick={() => setMax(!max)}
          >
            <CiMaximize1 />
          </span>
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: textColor }}
          >
            Quote
          </h2>
          <p className="text-sm text-center mb-4" style={{ color: textColor }}>
            Everyone is a genius at least once a year. The real geniuses simply
            have their bright ideas closer together.
          </p>
          <p className="text-sm font-semibold" style={{ color: textColor }}>
            Georg Christoph Lichtenberg
          </p>
        </div>

        {/* Check Contrast Button */}
      </div>
    </div>
  );
};

export default ColorContrastChecker;
