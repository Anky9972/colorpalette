import React, { useState } from "react";
import { ChevronDown, Maximize2 } from "lucide-react";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import "./Slider.css";

const GradientMaker = () => {
  const [color1, setColor1] = useState("#1E6C8E");
  const [color2, setColor2] = useState("#2E7775");
  const [position1, setPosition1] = useState(0);
  const [position2, setPosition2] = useState(100);
  const [rotation, setRotation] = useState(90);
  const [type, setType] = useState("linear");
  const [maximized, setMaximized] = useState(false);

  // Function to generate gradient CSS
  const gradientCSS = `${
    type === "linear"
      ? `linear-gradient(${rotation}deg, ${color1} ${position1}%, ${color2} ${position2}%)`
      : `radial-gradient(circle, ${color1} ${position1}%, ${color2} ${position2}%)`
  }`;

  const fullCSS = `
background: ${gradientCSS};
background: -moz-${gradientCSS};
background: -webkit-${gradientCSS};
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="${color1}", endColorstr="${color2}", GradientType=1);
`;

  // Copy gradient CSS to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullCSS);
  };

  // Handle random colors
  const handleRandom = () => {
    const newColor1 =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    const newColor2 =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    setColor1(newColor1);
    setColor2(newColor2);
  };

  return (
    <div className="w-full min-h-screen p-8 flex flex-col items-center">
      <div className="w-full flex flex-col justify-center items-center gap-5 mb-5 pt-10">
        <h1 className="text-5xl font-bold mb-2">Gradient Maker</h1>
        <p className="text-gray-500 mb-8">
          Create and export beautiful gradients.
        </p>
      </div>
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {/* Controls Panel */}
          <div className="bg-white p-5 pt-5 rounded-xl shadow-sm border border-gray-100">
            {/* Dual Thumb Slider */}
            <div className="w-full flex flex-col gap-5 mb-5">
              <input
                type="range"
                min="0"
                max="100"
                value={position1}
                onChange={(e) =>
                  setPosition1(Math.min(Number(e.target.value), position2))
                }
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  "--color1": color1,
                  "--color2": color2,
                  "--thumb-color": color1,
                  zIndex: position1 > position2 ? 2 : 1,
                }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={position2}
                onChange={(e) =>
                  setPosition2(Math.max(Number(e.target.value), position1))
                }
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  "--color1": color1,
                  "--color2": color2,
                  "--thumb-color": color2,
                  zIndex: position2 < position1 ? 2 : 1,
                }}
              />
            </div>

            {/* Color and Position Controls */}
            <div className="flex flex-col gap-5">
              <div className="w-full flex justify-between items-center gap-5">
                {/* Color 1 */}
                <div className="w-1/2">
                  <label className="block text-xs font-bold mb-2">Color</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      className="w-32 text-xs px-3 py-2 border rounded-l-lg"
                    />
                    <div className="relative w-10 p-1 border rounded-r-lg border-l-0">
                      <input
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div
                        className="h-full w-full rounded-md"
                        style={{ backgroundColor: color1 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Position */}
                <div className="w-1/2">
                  <label className="block text-xs font-bold mb-2">
                    Position
                  </label>
                  <div className="relative">
                    <select
                      value={position1}
                      onChange={(e) => setPosition1(Number(e.target.value))}
                      className="w-full text-xs px-3 py-2 bg-white border rounded-lg appearance-none"
                    >
                      <option value="0">0%</option>
                      <option value="25">25%</option>
                      <option value="50">50%</option>
                      <option value="75">75%</option>
                      <option value="100">100%</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-between items-center gap-5">
                {/* Rotation */}
                <div className="w-1/2">
                  <label className="block text-xs font-bold mb-2">
                    Rotation
                  </label>
                  <div className="relative">
                    <select
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs bg-white border rounded-lg appearance-none"
                    >
                      <option value="0">0°</option>
                      <option value="45">45°</option>
                      <option value="90">90°</option>
                      <option value="135">135°</option>
                      <option value="180">180°</option>
                      <option value="225">225°</option>
                      <option value="270">270°</option>
                      <option value="315">315°</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Type */}
                <div className="w-1/2">
                  <label className="block text-xs font-bold mb-2">Type</label>
                  <div className="relative">
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-white px-3 py-2 text-xs border rounded-lg appearance-none"
                    >
                      <option value="linear">Linear</option>
                      <option value="radial">Radial</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-5 mt-10">
              <button
                onClick={handleRandom}
                className="px-4 py-2 font-bold border rounded-lg text-xs hover:bg-gray-50 text-gray-700"
              >
                Random
              </button>
              <div className="flex items-center">
                <button
                  onClick={copyToClipboard}
                  className="w-full px-4 py-2 text-xs font-bold bg-black text-white rounded-l-lg flex items-center justify-center"
                >
                  Copy CSS
                </button>
                <button className="bg-black py-2 rounded-r-lg px-2 border-l">
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Gradient Preview */}
          <div className="relative h-full">
            <div
              className="w-full aspect-video rounded-xl h-full"
              style={{ background: gradientCSS }}
            />
            <Maximize2
              className="absolute top-3 right-3 w-5 h-5 text-white cursor-pointer"
              onClick={() => setMaximized(!maximized)}
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {maximized && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed z-20 w-full h-full top-0 left-0"
            style={{ background: gradientCSS }}
          >
            <span
              className="absolute right-2 top-2 rounded-lg p-1 bg-gray-100 hover:bg-slate-100 flex justify-center items-center hover:cursor-pointer"
              onClick={() => setMaximized(!maximized)}
            >
              <IoCloseSharp className="text-xl" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        input[type="range"] {
          --thumb-width: 16px;
          --thumb-height: 16px;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: var(--thumb-width);
          height: var(--thumb-height);
          border-radius: 50%;
          background: var(--thumb-color);
          border: 2px solid white;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          pointer-events: auto;
        }

        input[type="range"]::-moz-range-thumb {
          width: var(--thumb-width);
          height: var(--thumb-height);
          border-radius: 50%;
          background: var(--thumb-color);
          border: 2px solid white;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
};

export default GradientMaker;
