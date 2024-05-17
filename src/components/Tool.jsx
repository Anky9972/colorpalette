import React, { useContext, useState, useEffect } from "react";
import { BiBorderAll } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoCameraOutline, IoContrast, IoEyeOutline } from "react-icons/io5";
import ColorExtract from "./ColorExtract";
import { ImCross } from "react-icons/im";
import { ColorState } from "../context/ColorState";
import Variation from "./Variation";
import chroma from "chroma-js";
import nearestColor from "nearest-color";
import colorNameList from "color-name-list";
import { GoDotFill } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { Authentication } from "../context/Authentication";
import { CiImageOn, CiLink } from "react-icons/ci";
import {
  FaFacebook,
  FaPinterest,
  FaRegFileCode,
  FaRegFilePdf,
  FaWhatsapp,
} from "react-icons/fa6";
import { BsFiletypeSvg } from "react-icons/bs";
import {
  sharePalette,
  downloadPalettePDF,
  downloadPalettePNG,
  downloadPaletteSVG,
} from "./Exports";
import {toast} from 'react-hot-toast';

function Tool() {
  const { colors, setMenu, menu } = useContext(ColorState);
  const { setAdjust } = useContext(ColorState);
  const { SaveFullPalette } = useContext(Authentication);
  const [showColorExtract, setShowColorExtract] = useState(false);
  const [variation, setVariation] = useState(false);
  const [view, setView] = useState(false);
  const [viewColor, setViewColor] = useState("rgb(220,220,220)");
  const [selectedDotIndex, setSelectedDotIndex] = useState(null);
  const [share, setShare] = useState(false);
  const [embeddedcode, setEmbeddedcode] = useState("");
  const [codediv, setCodediv] = useState(false);
  // console.log('embeded code',embeddedcode)

  const toggleColorExtract = () => {
    setShowColorExtract(!showColorExtract);
  };

  const generateColors = () => {
    const rgbValues = viewColor.match(/\d+/g).map(Number);
    const chromaColor = chroma.rgb(rgbValues);

    // Set other color values
    setHslColor(chromaColor.hsl());
    setHsvColor(chromaColor.hsv());
    setCmykColor(chromaColor.cmyk());
    setLabColor(chromaColor.lab());
    setRgb(viewColor);
    setHex(chromaColor.hex());

    // Find the nearest color name
    const nearestColorName = getColorName(chromaColor.hex());
    setColorName(nearestColorName);
  };

  // State variables for color values
  const [rgb, setRgb] = useState([]);
  const [hex, setHex] = useState([]);
  const [hslColor, setHslColor] = useState([]);
  const [hsvColor, setHsvColor] = useState([]);
  const [cmykColor, setCmykColor] = useState([]);
  const [labColor, setLabColor] = useState([]);
  const [colorName, setColorName] = useState("Unknown");

  // Creating nearest color object
  const colors1 = colorNameList.reduce((obj, color) => {
    obj[color.name] = color.hex;
    return obj;
  }, {});
  useEffect(() => {
    if (viewColor) {
      generateColors();
    }
  }, []);

  const nearest = nearestColor.from(colors1);
  function getColorName(hexColor) {
    const colorName = nearest(hexColor);
    return colorName ? colorName.name : "Unknown";
  }

  // Format HSB and HSL values with three decimal places and separated by commas
  const formattedHsvColor = hsvColor
    .map((value) => value.toFixed(3))
    .join(", ");
  const formattedHslColor = hslColor
    .map((value) => value.toFixed(3))
    .join(", ");

  // Format CMYK values with three decimal places and separated by commas
  const formattedCmykColor = cmykColor
    .map((value) => value.toFixed(3))
    .join(", ");

  // Format LAB values with three decimal places and separated by commas
  const formattedLabColor = labColor
    .map((value) => value.toFixed(3))
    .join(", ");

  // Calculate the luminance of the background color
  const luminance =
    chroma.contrast("black", viewColor) > chroma.contrast("white", viewColor)
      ? "black"
      : "white";

  function loadEmbeddedPalette(colors) {
    const colorsString = colors
      .map((color) => encodeURIComponent(color.hex))
      .join(",");
    // Make a GET request to the backend endpoint
    fetch(`https://colorpalettebackend.onrender.com/api/v1/share-embedded?colors=${colorsString}`)
      .then((response) => {
        console.log("response of code", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // Convert response to text
      })
      .then((htmlContent) => {
        // Inject the received HTML into a container on the webpage
        // document.getElementById("paletteContainer").innerHTML = htmlContent;
        setEmbeddedcode(htmlContent);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });
  }

  function handleEmbeddbutton(colors){
    loadEmbeddedPalette(colors);
    setShare(false);
    setCodediv(true);
  }

  function handleCopycode(code){
    navigator.clipboard.writeText(code);
    toast.success(`Code copied to clipboard!`);
  }

  return (
    <div className="h-[51px]   w-full mt-[1px]  flex justify-center items-center bg-white">
      <div className="w-1/2 h-full hidden md:flex justify-start ml-16 items-center">
        Press the space bar to generate color palettes!
      </div>
      <div className="w-1/2 h-full ">
        <ul className="w-full h-full  flex justify-center items-center gap-4">
          <li className="text-2xl flex justify-center items-center">
            <button
              onClick={toggleColorExtract}
              className="w-10 h-8 rounded-md cursor-pointer hover:bg-slate-200 flex justify-center items-center"
            >
              <IoCameraOutline />
            </button>
          </li>
          <div className="border-r hidden md:block border-black h-7"></div>
          <li className="hidden  text-xl w-10 h-8 rounded-md cursor-pointer hover:bg-slate-200 md:flex justify-center items-center">
            <BiBorderAll onClick={() => setVariation(true)} />
          </li>
          <li className="hidden text-xl w-10 h-8 rounded-md cursor-pointer hover:bg-slate-200 md:flex justify-center items-center">
            <IoContrast />
          </li>
          <li className="hidden text-xl w-10 h-8 rounded-md cursor-pointer hover:bg-slate-200 md:flex justify-center items-center">
            <HiAdjustmentsHorizontal onClick={() => setAdjust(true)} />{" "}
          </li>
          <div className="border-r border-black h-7"></div>
          <li
            className="w-20  h-8 rounded-md hover:bg-slate-200 cursor-pointer flex gap-2 justify-center items-center"
            onClick={() => {
              SaveFullPalette(colors);
            }}
          >
            <FaRegHeart className="text-lg" />
            <span>Save</span>
          </li>
          <li
            className="w-20  h-8 rounded-md hover:bg-slate-200 cursor-pointer flex gap-2 justify-center items-center"
            onClick={() => setView(true)}
          >
            <IoEyeOutline className="text-lg" />
            <span>View</span>
          </li>
          <li
            className="w-20  h-8 rounded-md hover:bg-slate-200 cursor-pointer flex gap-2 justify-center items-center"
            onClick={() => setShare(true)}
          >
            <FiShare2 className="text-lg" />
            <span>Share</span>
          </li>
          <div className="border-r border-black h-7"></div>
          <li
            className="w-10 h-8 rounded-md hover:bg-slate-200 cursor-pointer flex justify-center items-center"
            onClick={() => setMenu(true)}
          >
            <RxHamburgerMenu className={`${menu ? "rotate-90" : ""}`} />
          </li>
        </ul>
      </div>
      <div className="">
        {share && (
          <div className="w-full h-screen z-50 left-0 top-0 flex justify-center items-center bg-slate-950 bg-opacity-40 absolute ">
            <div className=" w-[95%] md:w-[30%] h-[65%] mt-8 rounded-xl bg-white overflow-hidden flex flex-col">
              <div className="w-full h-12  flex justify-start items-center border-b border-slate-150">
                <span
                  className="ml-1 mt-1 rounded-lg w-10 h-8 hover:bg-slate-200 flex justify-center items-center hover:cursor-pointer"
                  onClick={() => setShare(false)}
                >
                  <ImCross />
                </span>
                <h1 className="m-auto mr-44 font-bold">Share Palette</h1>
              </div>
              <div className="w-full h-full grid grid-cols-4 grid-rows-3 p-3 gap-2">
                <div
                  onClick={() => sharePalette(colors)}
                  className="w-full h-full bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out"
                >
                  <span>
                    <CiLink className="text-5xl" />
                  </span>
                  <span>URL</span>
                </div>
                <div
                  onClick={() => downloadPalettePDF(colors)}
                  className="w-full h-full bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out"
                >
                  <span>
                    <FaRegFilePdf className="text-4xl" />
                  </span>
                  <span>PDF</span>
                </div>
                <div
                  onClick={() => downloadPalettePNG(colors)}
                  className="w-full h-full bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out"
                >
                  <span>
                    <CiImageOn className="text-4xl" />
                  </span>
                  <span>Image</span>
                </div>
                <div
                  onClick={() => downloadPaletteSVG(colors)}
                  className="w-full h-full bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out"
                >
                  <span>
                    <BsFiletypeSvg className="text-4xl" />
                  </span>
                  <span>SVG</span>
                </div>
                <div
                  onClick={() => {
                    handleEmbeddbutton(colors)
                  }}
                  className="w-full h-full bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out"
                >
                  <span>
                    <FaRegFileCode className="text-4xl" />
                  </span>
                  <span>Code</span>
                </div>
                
                <div className="w-full h-full bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out">
                  <span>
                    <FaWhatsapp className="text-4xl" />
                  </span>
                  <span>Whatsapp</span>
                </div>
                <div className="w-full h-full bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out">
                  <span>
                    <FaFacebook className="text-4xl" />
                  </span>
                  <span>Facebook</span>
                </div>
                <div className="w-full h-full bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out">
                  <span>
                    <FaPinterest className="text-4xl" />
                  </span>
                  <span>Pinterest</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {codediv && (
                  <div className="w-full h-screen z-50 left-0 top-0 flex justify-center items-center bg-slate-950 bg-opacity-40 absolute ">
                    <div className=" w-[95%] md:w-[30%] h-[65%] mt-8 rounded-xl bg-white overflow-hidden flex flex-col">
                      <div className="w-full h-10 border-b flex justify-center items-center ">
                        <span className="ml-2 hover:cursor-pointer" onClick={()=>setCodediv(false)}><ImCross/></span>
                      <h1 className="m-auto mr-52 font-bold">Code</h1>
                      </div>
                      <div className="h-4/5 p-5">
                        <p className="w-full h-full text-[0.75rem] border border-black p-2">
                        {embeddedcode}
                        </p>
                      </div>
                      <div className="w-full h-10 px-5">
                        <button onClick={()=>handleCopycode(embeddedcode)} className="w-full bg-[#005ce6] h-full text-white font-bold">Copy code</button>
                      </div>
                    </div>
                  </div>
                )}
        {view && (
          <div className="w-full h-screen z-50 left-0 top-0 flex justify-center items-center bg-slate-950 bg-opacity-40 absolute ">
            <div className=" w-[95%] md:w-[32%] h-3/4 mt-8 rounded-xl bg-white overflow-hidden flex flex-col">
              <div className="w-full h-16  flex justify-start items-center">
                <span
                  className="ml-2 rounded-lg w-10 h-8 hover:bg-slate-200 flex justify-center items-center hover:cursor-pointer"
                  onClick={() => setView(false)}
                >
                  <ImCross />
                </span>
                <div className="w-full flex justify-center items-center">
                  <h1 className="font-bold mr-6 md:mr-4 ">Quick view</h1>
                </div>
              </div>
              <div
                className="w-full h-full overflow-y-scroll p-6"
                style={{ backgroundColor: viewColor }}
              >
                <div className="w-full h-1/5 ">
                  <div className={`w-full text-xs font-bold text-${luminance}`}>
                    HEX
                  </div>
                  <div
                    className={`w-full text-md font-semibold text-${luminance}`}
                  >
                    {hex}
                  </div>
                </div>
                <div className="w-full h-1/5 ">
                  <div className={`w-full text-xs font-bold text-${luminance}`}>
                    HSB
                  </div>
                  <div
                    className={`w-full text-md font-semibold text-${luminance}`}
                  >
                    {formattedHsvColor}
                  </div>
                </div>
                <div className="w-full h-1/5 ">
                  <div className={`w-full text-xs font-bold text-${luminance}`}>
                    HSL
                  </div>
                  <div
                    className={`w-full text-md font-semibold text-${luminance}`}
                  >
                    {formattedHslColor}
                  </div>
                </div>
                <div className="w-full h-1/5 ">
                  <div className={`w-full text-xs font-bold text-${luminance}`}>
                    RGB
                  </div>
                  <div
                    className={`w-full text-md font-semibold text-${luminance}`}
                  >
                    {rgb}
                  </div>
                </div>
                <div className="w-full h-1/5 ">
                  <div className={`w-full text-xs font-bold text-${luminance}`}>
                    CMYK
                  </div>
                  <div
                    className={`w-full text-md font-semibold text-${luminance}`}
                  >
                    {formattedCmykColor}
                  </div>
                </div>
                <div className="w-full h-1/5 ">
                  <div className={`w-full text-xs font-bold text-${luminance}`}>
                    LAB
                  </div>
                  <div
                    className={`w-full text-md font-semibold text-${luminance}`}
                  >
                    {formattedLabColor}
                  </div>
                </div>
                <div className="w-full h-1/5">
                  <div className={`w-full text-xs font-bold text-${luminance}`}>
                    NAME
                  </div>
                  <div
                    className={`w-full text-md font-semibold text-${luminance}`}
                  >
                    {colorName}
                  </div>
                </div>
              </div>
              <div className="w-full h-32 flex justify-center items-center px-6">
                <div className="w-full rounded-xl overflow-hidden flex flex-row justify-center ">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      style={{ backgroundColor: color.rgb }}
                      onClick={() => {
                        setViewColor(color.rgb);
                        setSelectedDotIndex(index);
                      }}
                      className="w-1/5 h-12 flex justify-center items-center cursor-pointer "
                    >
                      {selectedDotIndex === index && (
                        <span className={`text-${luminance}`}>
                          <GoDotFill />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {variation && (
          <div className="w-full h-screen z-50 left-0 top-0 flex justify-center items-center bg-slate-950 bg-opacity-40 absolute ">
            <div className="w-[62%] max-h-screen h-auto bg-white rounded-xl flex flex-col overflow-hidden">
              <div className="w-full h-14 flex justify-between items-center">
                <ImCross
                  className="ml-4 "
                  onClick={() => setVariation(false)}
                />
                <span className="mr-[42%] font-bold text-lg">
                  Palette variations
                </span>
              </div>
              <div className=" w-full h-auto overflow-y-scroll">
                <Variation />
              </div>
            </div>
          </div>
        )}
        {showColorExtract && (
          <div className="w-full h-screen left-0 top-0 z-50 flex justify-center items-center bg-slate-950 bg-opacity-40 absolute">
            <div className="modal absolute z-30 w-[95%] md:w-[31%] h-auto bg-white rounded-xl overflow-hidden ">
              <div className="w-full h-4/5">
                <span className="" onClick={toggleColorExtract}>
                  <ImCross className="ml-4 mt-4 cursor-pointer" />
                </span>
                <ColorExtract />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tool;
