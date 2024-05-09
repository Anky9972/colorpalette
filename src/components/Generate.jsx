import React, { useState, useEffect, useContext } from "react";
import colorNameList from "color-name-list";
import nearestColor from "nearest-color";
import { toast } from "react-hot-toast";
import {
  FaHeart,
  FaLock,
  FaRegCopy,
  FaRegHeart,
  FaUnlock,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { ColorState } from "../context/ColorState";
import { ImCross } from "react-icons/im";
import { Authentication } from "../context/Authentication";

function Generate() {
  const { setColors, adjust, setAdjust, menu, setMenu,showsavedcolors,setShowsavedcolors } =
    useContext(ColorState);
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
  const [liked, setLiked] = useState([false, false, false, false, false]);
  const [rangevalue, setRangeValue] = useState(0);
  const [rangevalue2, setRangeValue2] = useState(0);
  const [rangevalue3, setRangeValue3] = useState(0);
  const [rangevalue4, setRangeValue4] = useState(0);
  // const [showsavedcolors, setShowsavedcolors] = useState(true);

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
    if(isLoggedIn)
      {

        handleGetSave();
        getFullPalette();
      }
  }, [menu]);

  function handleGenerateButtonClick() {
    generateRandomPalette();
    // Trigger spacebar keydown event
    const event = new KeyboardEvent("keydown", { keyCode: 32 });
    document.body.dispatchEvent(event);
  }


  return (
    <>
    <div className=" w-full h-full md:h-full flex justify-center items-baseline  ">

      <div
        id="colorPalette"
        className="w-full md:h-full flex flex-col md:flex-row mt-[117px] md:mt-0 "
      >
        <div className=" md:hidden left-5 absolute bottom-0">
          <button className="w-24 h-10 bg-slate-200" onClick={handleGenerateButtonClick}>Generate</button>
        </div>
        {colorPalette.map((color, index) => (
          <div
            key={index} 
            className="color-box w-full h-[110px] md:h-full flex flex-col justify-end items-center"
            style={{
              backgroundColor: color.rgb,
              color: getTextColor(color.hex),
            }}
          >
            <div className=" md:hidden flex flex-col justify-center items-center ">
                <div className="text-4xl w-40 flex justify-center items-center rounded-lg hover:bg-[#666666] hover:bg-opacity-15 font-bold">
                  {color.hex.split("#").pop().toUpperCase()}
                </div>

                <div className="text-sm mt-5 mb-5 font-semibold">
                  {getColorName(color.hex)}
                </div>
              <div className=" absolute right-2 mb-16">
                <button
                  onClick={() => {
                    const newLiked = [...liked];
                    newLiked[index] = !newLiked[index];
                    if (isLoggedIn) {
                      setLiked(newLiked);
                      setSinglePalette(color.hex);
                      handleSave();
                    } else {
                      toast.error("Please Login to your account.");
                    }
                  }}
                >
                  {!liked[index] ? <FaRegHeart className="text-xl" /> : <FaHeart />}
                </button>
              </div>
            </div>
            <div className="hidden md:flex flex-col mb-20 h-full w-full justify-end items-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1, transition: { type: "spring" } }}
                className="flex flex-col w-full justify-end items-center mb-10 gap-4 h-full "
              >
                <div>
                  <button
                    onClick={() => {
                      const newLiked = [...liked];
                      newLiked[index] = !newLiked[index];
                      if (isLoggedIn) {
                        setLiked(newLiked);
                        setSinglePalette(color.hex);
                        handleSave();
                      } else {
                        toast.error("Please Login to your account.");
                      }
                    }}
                  >
                    {!liked[index] ? <FaRegHeart /> : <FaHeart />}
                  </button>
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
        {menu && (
          <motion.div
            className=" h-full md:h-[84%]  right-0 fixed md:relative md:z-0 z-40 bg-white  w-full top-0 md:mt-[120px]  md:w-[120%] overflow-y-scroll"
            // initial={{ width: 0 }}
            // animate={{ width: "120%" }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { duration: 1, delay: 0.5 },
              }}
              className="h-12  border-b border-black flex justify-between items-center gap-3"
            >
              <span
                className="ml-2 rounded-lg w-10 h-8 hover:bg-slate-200 flex justify-center items-center hover:cursor-pointer"
                onClick={() => setMenu(false)}
              >
                <ImCross />
              </span>
              <div className="md:mr-20 mr-[138px] flex gap-2 text-sm">
                <button
                  className={` h-8 ${
                    showsavedcolors ? " font-bold text-base" : ""
                  }`}
                  onClick={() => {
                    setShowsavedcolors(true);
                  }}
                >
                  Colors
                </button>
                <button
                  className={` h-8 ${
                    !showsavedcolors ? " font-bold text-base" : ""
                  }`}
                  onClick={() => {
                    setShowsavedcolors(false);
                  }}
                >
                  Palettes
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { duration: 1, delay: 0.5 },
              }}
              className=" w-full h-auto flex flex-col justify-center  p-1"
            >
              {showsavedcolors && (
                <div className="w-full flex flex-col justify-center items-center gap-1">
                  <p className="font-bold ">Your saved Colors.</p>
                  {singleColor.length > 0 ? (
                    singleColor.map((saved, index) => (
                      
                      <div
                        key={index}
                        style={{ backgroundColor: saved }}
                        className="w-full h-10"
                      ></div>
                    ))
                  ) : (
                    
                    <>
                      <p className="w-4/5 text-center mt-14">
                        Your saved palettes will appear here.
                      </p>
                    </> 
                  )}
                </div>
              )}
              {!showsavedcolors && (
                <div className="flex flex-col w-full gap-1  ">
                  <p className="font-bold m-auto ">Your saved Colors.</p>
                  {fullPalette.length > 0 ? (
                    fullPalette.map((palette, index) => (
                      <div
                        key={index}
                        className="flex justify-start items-center rounded-xl overflow-hidden"
                      >
                        {palette.map((color, index) => (
                          <div
                            key={index}
                            style={{ backgroundColor: color.hex }}
                            className="w-full h-10 "
                          ></div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p className="w-4/5 m-auto text-center mt-14">
                      Your saved palettes will appear here.
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
        {adjust && (
          <div className="w-[120%]  md:h-[84%]   h-full right-0 md:mt-28 ">
            <div className="w-full flex justify-center items-center border-t border-b border-black   h-[11%]">
              <h1 className="text-lg font-bold">Adjust palette</h1>
            </div>
            <div className="w-full h-3/4 flex flex-col gap-7 ">
              <div className="w-full flex flex-col justify-center mt-8 items-center gap-3">
                <div className="w-3/4 flex justify-between">
                  <span className=" text-sm font-bold">Hue</span>
                  <span className="w-10 h-6 rounded-md border border-slate-500 flex justify-center items-center ">
                    {rangevalue}
                  </span>
                </div>
                <input
                  type="range"
                  min="-180"
                  value={rangevalue}
                  max="180"
                  onChange={(e) => setRangeValue(e.target.value)}
                  className="w-3/4"
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <div className="w-3/4 flex justify-between">
                  <span className=" text-sm font-bold">Saturation</span>
                  <span className="w-10 h-6 rounded-md border border-slate-500 flex justify-center items-center ">
                    {rangevalue2}
                  </span>
                </div>
                <input
                  type="range"
                  min="-100"
                  value={rangevalue2}
                  max="100"
                  className="w-3/4"
                  onChange={(e) => setRangeValue2(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <div className="w-3/4 flex justify-between">
                  <span className=" text-sm font-bold">Brightness</span>
                  <span className="w-10 h-6 rounded-md border border-slate-500 flex justify-center items-center ">
                    {rangevalue3}
                  </span>
                </div>
                <input
                  type="range"
                  min="-100"
                  value={rangevalue3}
                  max="100"
                  className="w-3/4"
                  onChange={(e) => setRangeValue3(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <div className="w-3/4 flex justify-between">
                  <span className=" text-sm font-bold">Temperature</span>
                  <span className="w-10 h-6 rounded-md border border-slate-500 flex justify-center items-center ">
                    {rangevalue4}
                  </span>
                </div>
                <input
                  type="range"
                  min="-100"
                  value={rangevalue4}
                  max="100"
                  className="w-3/4"
                  onChange={(e) => setRangeValue4(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full h-[14%] flex justify-around items-center border-t border-solid border-black ">
              <button
                className="w-28 h-10 rounded-md bg-green-200 font-bold"
                onClick={() => setAdjust(false)}
              >
                Cancel
              </button>
              <button className="w-28 h-10 rounded-md bg-green-200 font-bold">
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Generate;
