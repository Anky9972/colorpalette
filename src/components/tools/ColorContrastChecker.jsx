import React, { useState } from "react";
import { CiMaximize1 } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { border } from "polished";

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

  const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
  };

  const getContrastRatio = (color1, color2) => {
    const [r1, g1, b1] = hexToRgb(color1);
    const [r2, g2, b2] = hexToRgb(color2);
    const l1 = getLuminance([r1, g1, b1]);
    const l2 = getLuminance([r2, g2, b2]);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
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
    setContrastRatio(Number(ratio));
  };

  const getContrastColors = (ratio, threshold) => {
    const isAccessible = ratio >= threshold;
    const normalizedRatio = Math.min(ratio / 7, 1); // Normalize ratio to 0-1 scale
    const intensity = Math.floor(normalizedRatio * 255);

    if (isAccessible) {
      return {
        background: `rgba(0, ${intensity}, 0, 0.1)`,
        text: `rgb(0, ${Math.min(intensity + 50, 255)}, 0)`,
        border: `rgba(0, ${intensity}, 0, 0.2)`,
        rating: "Accessible",
        stars: Math.min(Math.ceil(ratio / (threshold === 3 ? 1.5 : 2)), 5)
      };
    } else {
      return {
        background: `rgba(${intensity}, 0, 0, 0.1)`,
        text: `rgb(${Math.min(intensity + 50, 255)}, 0, 0)`,
        border: `rgba(${intensity}, 0, 0, 0.2)`,
        rating: "Not Accessible",
        stars: Math.min(Math.ceil(ratio / (threshold === 3 ? 1.5 : 2)), 5)
      };
    }
  };

  const renderStars = (numStars) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < numStars ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
        } transition-colors duration-200`}
      />
    ));
  };

  const getMainContrastColors = (ratio) => {
    const normalizedRatio = Math.min(ratio / 7, 1);
    const intensity = Math.floor(normalizedRatio * 255);
    const isAccessible = ratio >= 4.5;

    if (isAccessible) {
      return {
        background: `rgba(0, ${intensity}, 0, 0.1)`,
        text: `rgb(0, ${Math.min(intensity + 50, 255)}, 0)`
      };
    } else {
      return {
        background: `rgba(${intensity}, 0, 0, 0.1)`,
        text: `rgb(${Math.min(intensity + 50, 255)}, 0, 0)`
      };
    }
  };

  const smallTextColors = contrastRatio ? getContrastColors(contrastRatio, 4.5) : null;
  const largeTextColors = contrastRatio ? getContrastColors(contrastRatio, 3) : null;
  const mainColors = contrastRatio ? getMainContrastColors(contrastRatio) : null;

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
            <div className="mb-4 relative">
              <label className="block text-xs font-semibold mb-1">
                Background Color:
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={bgColorInput}
                  onChange={(e) => handleColorChange(e, "bg")}
                  placeholder="Enter HEX"
                  className="w-full p-2 border rounded-l-lg text-xs uppercase"
                />
                <div className="relative w-10 p-1 border rounded-r-lg border-l-0">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => {
                      setBgColor(e.target.value);
                      setBgColorInput(e.target.value);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div
                    className="h-full w-full rounded-md"
                    style={{ backgroundColor: bgColor }}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4 relative">
              <label className="block text-xs font-semibold mb-1">
                Text Color:
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={textColorInput}
                  onChange={(e) => handleColorChange(e, "text")}
                  placeholder="Enter HEX"
                  className="w-full p-2 border rounded-l-lg text-xs uppercase"
                />
                <div className="relative w-10 p-1 border rounded-r-lg border-l-0">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => {
                      setTextColor(e.target.value);
                      setTextColorInput(e.target.value);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div
                    className="h-full w-full rounded-md"
                    style={{ backgroundColor: textColor }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 rounded-lg text-center">
            <h1 className="w-full flex justify-start text-xs font-semibold">
              Contrast:
            </h1>
            {contrastRatio ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className=" overflow-hidden mt-1"
              >
                <div 
                  className="text-5xl font-bold w-full p-4 rounded-t-lg transition-colors duration-300"
                  style={{ 
                    backgroundColor: mainColors.background,
                    color: mainColors.text,
                    border: `1px solid ${mainColors.text.replace('rgb', 'rgba').replace(')', ', 0.2)')}`
                  }}
                >
                  {contrastRatio}
                </div>
                <div className="mt-1 flex w-full gap-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex justify-between items-center p-4 w-full rounded-b-lg transition-colors duration-300"
                    style={{ 
                      backgroundColor: smallTextColors.background,
                      border: `1px solid ${smallTextColors.border}`,
                      color: smallTextColors.text
                    }}
                  >
                    <p className="text-sm font-semibold">Small Text</p>
                    <div className="flex flex-col items-end justify-center">
                      <p className="text-xs">{smallTextColors.rating}</p>
                      <div className="flex gap-1 mt-1">
                        {renderStars(smallTextColors.stars)}
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex justify-between items-center p-4 w-full rounded-b-lg transition-colors duration-300"
                    style={{ 
                      backgroundColor: largeTextColors.background,
                      border: `1px solid ${largeTextColors.border}`,
                      color: largeTextColors.text
                    }}
                  >
                    <p className="text-sm font-semibold">Large Text</p>
                    <div className="flex flex-col items-end justify-center">
                      <p className="text-xs">{largeTextColors.rating}</p>
                      <div className="flex gap-1 mt-1">
                        {renderStars(largeTextColors.stars)}
                      </div>
                    </div>
                  </motion.div>
                </div>
                <p 
                  className="text-xs mt-2 font-bold transition-colors duration-300"
                  style={{ color: mainColors.text }}
                >
                  {contrastRatio >= 4.5 
                    ? "The color combination is accessible for normal text."
                    : "The color combination is not accessible for normal text."}
                </p>
              </motion.div>
            ) : (
              <p className="text-md text-gray-600">
                Check contrast to see result
              </p>
            )}
            <button
              onClick={handleCheckContrast}
              className="w-full mt-5 bg-black text-white py-2 px-4 rounded-lg font-bold hover:bg-gray-900 transition duration-200"
            >
              Check Contrast
            </button>
          </div>
        </div>

        <AnimatePresence>
          {max && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0", top: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full fixed left-0 h-full z-10 flex flex-col justify-center items-center"
              style={{ backgroundColor: bgColor }}
            >
              <span
                className="absolute right-2 top-2 p-1 bg-gray-100 rounded-md border cursor-pointer"
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
        </AnimatePresence>

        <div
          className="w-full md:w-1/2 p-6 rounded-r-xl flex flex-col justify-center items-center relative"
          style={{ backgroundColor: bgColor }}
        >
          <span
            className="absolute right-2 top-2 p-1 cursor-pointer"
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
      </div>
    </div>
  );
};

export default ColorContrastChecker;