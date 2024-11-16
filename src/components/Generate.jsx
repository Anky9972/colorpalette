import React, { useState, useEffect, useContext } from "react";
import colorNameList from "color-name-list";
import nearestColor from "nearest-color";
import { toast } from "react-hot-toast";
import { FaLock, FaRegCopy, FaUnlock } from "react-icons/fa";
import { motion } from "framer-motion";
import { ColorState } from "../context/ColorState";
import { Authentication } from "../context/Authentication";
import Tool from "./Tool";
import ToolsMenu from "./tools/ToolsMenu";
import Adjust from "./tools/Adjust";
import { CiHeart } from "react-icons/ci";

function Generate() {
  const {
    setColors,
    adjust,
    setAdjust,
    menu,
    setMenu,
    showsavedcolors,
    setShowsavedcolors,
  } = useContext(ColorState);
  const {
    setSinglePalette,
    handleSave,
    handleGetSave,
    singleColor,
    isLoggedIn,
    getFullPalette,
    fullPalette,
  } = useContext(Authentication);
  const [colorPalette, setColorPalette] = useState([]);
  const [lock, setLock] = useState([false, false, false, false, false]);

  // const [showsavedcolors, setShowsavedcolors] = useState(true);
  const [mobileTool, setMobileTool] = useState(false);
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function rgbToHex(rgb) {
    const [r, g, b] = rgb.match(/\d+/g);
    return (
      "#" +
      ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b))
        .toString(16)
        .slice(1)
    );
  }

  function generateRandomPalette() {
    const palette = [];
    for (let i = 0; i < 5; i++) {
      const rgbColor = `rgb(${getRandomInt(256)}, ${getRandomInt(
        256
      )}, ${getRandomInt(256)})`;
      const hexColor = rgbToHex(rgbColor);
      palette.push({ rgb: rgbColor, hex: hexColor });
    }
    setColorPalette(palette);
    setColors(palette);
  }

  function copyColorCode(rgbColor, hexColor) {
    const textToCopy = `${hexColor}`;
    navigator.clipboard.writeText(textToCopy);
    toast.success(`Color copied to clipboard!`);
  }

  const colors = colorNameList.reduce((obj, color) => {
    obj[color.name] = color.hex;
    return obj;
  }, {});

  const nearest = nearestColor.from(colors);

  function getColorName(hexColor) {
    const colorName = nearest(hexColor);
    return colorName ? colorName.name : "Unknown";
  }

  function getTextColor(hexColor) {
    const rgbColor = hexToRgb(hexColor);
    const luminance =
      (0.2126 * rgbColor.r + 0.7152 * rgbColor.g + 0.0722 * rgbColor.b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
  }

  function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function handleSpacebarKeyDown(event) {
    if (event.keyCode === 32) {
      generateRandomPalette();
    }
  }

  useEffect(() => {
    document.body.addEventListener("keydown", handleSpacebarKeyDown);
    generateRandomPalette();
    return () => {
      document.body.removeEventListener("keydown", handleSpacebarKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      handleGetSave();
      getFullPalette();
    }
  }, [menu]);

  function handleGenerateButtonClick() {
    generateRandomPalette();
    const event = new KeyboardEvent("keydown", { keyCode: 32 });
    document.body.dispatchEvent(event);
  }

  useEffect(() => {
    if (window.innerWidth < 770) {
      setMobileTool(true);
    }
  }, [window.innerWidth]);

  return (
    <div className=" w-full h-full flex flex-col ">
      {!mobileTool && <Tool />}
      <div
        id="colorPalette"
        className="w-full flex h-full flex-col lg:flex-row "
      >
        {colorPalette.map((color, index) => (
          <div
            key={index}
            className="flex-auto lg:flex-1 lg:h-full flex flex-col justify-center lg:justify-end items-start md:items-center"
            style={{
              backgroundColor: color.rgb,
              color: getTextColor(color.hex),
            }}
          >
            <div className="p-2 lg:hidden flex flex-col justify-center items-center ">
              <div className="text-2xl w-40 flex justify-center items-center rounded-lg hover:bg-[#666666] hover:bg-opacity-15 font-bold">
                {color.hex.split("#").pop().toUpperCase()}
              </div>
              <div className="text-sm mt-5 font-semibold">
                {getColorName(color.hex)}
              </div>

              <div className=" absolute right-2 mb-16">
                <CiHeart
                  className="text-xl"
                  onClick={() => {
                    if (isLoggedIn) {
                      setSinglePalette(color.hex);
                      handleSave(color.hex);
                    } else {
                      toast.error("Please Login to your account.");
                    }
                  }}
                />
              </div>
            </div>
            <div className="hidden lg:flex flex-col mb-20 h-full w-full justify-end items-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1, transition: { type: "spring" } }}
                className="flex flex-col w-full justify-end items-center mb-10 gap-4 h-full "
              >
                <div>
                  <CiHeart
                    className="text-xl"
                    onClick={() => {
                      if (isLoggedIn) {
                        setSinglePalette(color.hex);
                        handleSave(color.hex);
                      } else {
                        toast.error("Please Login to your account.");
                      }
                    }}
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      const newLock = [...lock];
                      newLock[index] = !newLock[index];
                      setLock(newLock);
                    }}
                  >
                    {lock[index] ? <FaUnlock /> : <FaLock />}
                  </button>
                </div>
                <div
                  onClick={() => copyColorCode(color.rgb, color.hex)}
                  className=" cursor-pointer"
                >
                  <FaRegCopy />
                </div>
              </motion.div>

              <div className="text-4xl w-40 flex justify-center items-center rounded-lg hover:bg-[#666666] hover:bg-opacity-15 font-bold">
                {color.hex.split("#").pop().toUpperCase()}
              </div>

              <div className="text-sm mt-5 font-semibold">
                {getColorName(color.hex)}
              </div>
            </div>
          </div>
        ))}
        {mobileTool && (
          <Tool handleGenerateButtonClick={handleGenerateButtonClick} />
        )}

        {menu && <ToolsMenu />}
        {adjust && <Adjust adjust={adjust} setAdjust={setAdjust} />}
      </div>
    </div>
  );
}

export default Generate;
