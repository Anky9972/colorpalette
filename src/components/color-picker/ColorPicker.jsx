import { Maximize2 } from "lucide-react";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { CiHeart } from "react-icons/ci";

const ColorPicker = () => {
  const [color, setColor] = useState("#D062A4");

  const colorName = "Sky magenta";

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-gray-50 p-8">
      <div className="w-full flex flex-col justify-center items-center gap-5">
      <h1 className="text-5xl font-bold">Color picker</h1>
      <p className="text-gray-500 w-1/3 text-center">
        Get useful color information like conversion, combinations, blindness simulation and more.
      </p>
      </div>
      <div className="w-full flex justify-center items-center mt-10 gap-5 ">
        {/* Color Preview Card */}
        <div
          className="relative w-full max-w-2xl h-60 rounded-xl  flex flex-col items-center justify-center gap-4"
          style={{ backgroundColor: color }}
        >
          <p className="text-gray-500 font-bold">{color.toUpperCase()}</p>
          <h2 className="text-2xl font-bold text-black">{colorName}</h2>
          <div className="absolute top-4 right-4 flex items-center gap-5">
          <CiHeart className="text-xl"/>
          <Maximize2 size={16} color="white" />
          </div>
        </div>

        {/* Color Picker */}
        <div className="p-2 flex flex-col items-center gap-2 rounded-xl border">
          <HexColorPicker color={color} onChange={setColor} />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full text-xs font-bold uppercase border border-gray-300 rounded-md text-left p-1"
          />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="mt-10 flex space-x-6 text-gray-500 text-sm">
        <a href="#conversion" className="hover:text-black">Conversion</a>
        <a href="#variations" className="hover:text-black">Variations</a>
        <a href="#harmonies" className="hover:text-black">Color harmonies</a>
        <a href="#blindness" className="hover:text-black">Blindness simulator</a>
        <a href="#contrast" className="hover:text-black">Contrast checker</a>
        <a href="#libraries" className="hover:text-black">Color libraries</a>
        <a href="#palettes" className="hover:text-black">Color palettes</a>
      </div>
    </div>
  );
};

export default ColorPicker;
