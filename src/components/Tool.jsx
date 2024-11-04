import React, { useContext, useState } from "react";
import { BiBorderAll } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoCameraOutline, IoCloseSharp, IoContrast, IoEyeOutline } from "react-icons/io5";
import ColorExtract from "./ColorExtract";
import { ImCross } from "react-icons/im";
import { ColorState } from "../context/ColorState";
import Variation from "./Variation";
// import chroma from "chroma-js";
// import nearestColor from "nearest-color";
// import colorNameList from "color-name-list";
// import { GoDotFill } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { Authentication } from "../context/Authentication";
// import { CiImageOn, CiLink } from "react-icons/ci";
// import {
//   FaFacebook,
//   FaPinterest,
//   FaRegFileCode,
//   FaRegFilePdf,
//   FaWhatsapp,
// } from "react-icons/fa6";
// import { BsFiletypeSvg } from "react-icons/bs";
// import {
//   sharePalette,
//   downloadPalettePDF,
//   downloadPalettePNG,
//   downloadPaletteSVG,
// } from "./Exports";
import {toast} from 'react-hot-toast';
import View from "./tools/View";
import Share from "./tools/Share";

function Tool({handleGenerateButtonClick}) {
  const { colors, setMenu, menu } = useContext(ColorState);
  const { setAdjust, adjust } = useContext(ColorState);
  const { SaveFullPalette } = useContext(Authentication);
  const [showColorExtract, setShowColorExtract] = useState(false);
  const [variation, setVariation] = useState(false);
  const [view, setView] = useState(false);
  const [viewColor, setViewColor] = useState("rgb(220,220,220)");
  // const [selectedDotIndex, setSelectedDotIndex] = useState(null);
  const [share, setShare] = useState(false);
  const [embeddedcode, setEmbeddedcode] = useState("");
  const [codediv, setCodediv] = useState(false);
  // console.log('embeded code',embeddedcode)

  const toggleColorExtract = () => {
    setShowColorExtract(!showColorExtract);
  };

  // const generateColors = () => {
  //   const rgbValues = viewColor.match(/\d+/g).map(Number);
  //   const chromaColor = chroma.rgb(rgbValues);

  //   // Set other color values
  //   setHslColor(chromaColor.hsl());
  //   setHsvColor(chromaColor.hsv());
  //   setCmykColor(chromaColor.cmyk());
  //   setLabColor(chromaColor.lab());
  //   setRgb(viewColor);
  //   setHex(chromaColor.hex());

  //   // Find the nearest color name
  //   const nearestColorName = getColorName(chromaColor.hex());
  //   setColorName(nearestColorName);
  // };

  // // State variables for color values
  // const [rgb, setRgb] = useState([]);
  // const [hex, setHex] = useState([]);
  // const [hslColor, setHslColor] = useState([]);
  // const [hsvColor, setHsvColor] = useState([]);
  // const [cmykColor, setCmykColor] = useState([]);
  // const [labColor, setLabColor] = useState([]);
  // const [colorName, setColorName] = useState("Unknown");

  // Creating nearest color object
  // const colors1 = colorNameList.reduce((obj, color) => {
  //   obj[color.name] = color.hex;
  //   return obj;
  // }, {});
  // useEffect(() => {
  //   if (viewColor) {
  //     generateColors();
  //   }
  // }, []);

  // const nearest = nearestColor.from(colors1);
  // function getColorName(hexColor) {
  //   const colorName = nearest(hexColor);
  //   return colorName ? colorName.name : "Unknown";
  // }


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
    <div className="p-2 w-full flex justify-center items-center bg-white">
      <div className="w-1/2 h-full hidden lg:flex justify-start ml-16 items-center text-sm font-semibold text-gray-500">
        Press the space bar to generate color palettes!
      </div>
      <div className=" lg:hidden  w-full">
          <button className="px-2 py-1 border border-gray-200 text-md rounded-md font-semibold" onClick={handleGenerateButtonClick}>Generate</button>
        </div>
      <div className="w-full md:w-1/2 h-full ">
        <ul className="w-full h-full  flex md:justify-end items-center gap-1 md:gap-2">
          <li className=" flex justify-center items-center">
            <button
              onClick={toggleColorExtract}
              className=" px-2 py-1 rounded-md cursor-pointer hover:bg-slate-100 flex justify-center items-center"
            >
              <IoCameraOutline className="text-xl"/>
            </button>
          </li>
          <div className="border-r hidden md:block h-7"></div>
          <li className="hidden  text-xl px-2 py-1 rounded-md cursor-pointer hover:bg-slate-100 md:flex justify-center items-center">
            <BiBorderAll onClick={() => setVariation(!variation)} />
          </li>
          <li className="hidden text-xl px-2 py-1 rounded-md cursor-pointer hover:bg-slate-100 md:flex justify-center items-center">
            <IoContrast />
          </li>
          <li className="hidden text-xl px-2 py-1 rounded-md cursor-pointer hover:bg-slate-100 md:flex justify-center items-center">
            <HiAdjustmentsHorizontal onClick={() => setAdjust(!adjust)} />{" "}
          </li>
          <div className="border-r h-7"></div>
          <li
            className="px-4 py-1 rounded-md hover:bg-slate-100 cursor-pointer flex gap-2 justify-center items-center"
            onClick={() => {
              SaveFullPalette(colors);
            }}
          >
            <FaRegHeart className="text-lg" />
            <span className="hidden lg:block text-sm font-bold">Save</span>
          </li>
          <li
            className="px-4 py-1 rounded-md hover:bg-slate-100 cursor-pointer flex gap-2 justify-center items-center"
            onClick={() => setView(!view)}
          >
            <IoEyeOutline className="text-lg" />
            <span className="hidden lg:block text-sm font-bold">View</span>
          </li>
          <li
            className="px-2 py-1 rounded-md hover:bg-slate-100 cursor-pointer flex gap-2 justify-center items-center"
            onClick={() => setShare(!share)}
          >
            <FiShare2 className="text-lg" />
            <span className="hidden lg:block text-sm font-bold">Share</span>
          </li>
          <div className="border-r h-7"></div>
          <li
            className="px-2 py-1 rounded-md hover:bg-slate-100 cursor-pointer flex justify-center items-center"
            onClick={() => setMenu(!menu)}
          >
            {/* <RxHamburgerMenu className={`${menu ? "rotate-90" : ""}`} /> */}
            {
              menu ? (<IoCloseSharp/>) : (<RxHamburgerMenu/>)
            }
          </li>
        </ul>
      </div>
      <div className="">
        {
          share && (
            <Share setShare={setShare} share={share} handleEmbeddbutton={handleEmbeddbutton}/>
          )
        }
        {codediv && (
                  <div className="w-full h-screen z-50 left-0 top-0 flex justify-center items-center bg-slate-950 bg-opacity-40 absolute ">
                    <div className=" w-[95%] md:w-[30%] h-[65%] mt-8 rounded-xl bg-white overflow-hidden flex flex-col">
                      <div className="w-full h-10 border-b flex justify-center items-center ">
                        <span className="ml-2 hover:cursor-pointer" onClick={()=>setCodediv(!codediv)}><ImCross/></span>
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
        {/* {view && (
          <div className="w-full h-screen z-50 left-0 top-0 flex justify-center items-center bg-slate-950 bg-opacity-40 absolute ">
            <div className=" w-[95%] md:w-[32%] h-3/4 mt-8 rounded-xl bg-white overflow-hidden flex flex-col">
              <div className="w-full h-16  flex justify-center items-center relative">
                <span
                  className="absolute left-1 rounded-lg p-1 hover:bg-slate-100 flex justify-center items-center hover:cursor-pointer"
                  onClick={() => setView(!view)}
                >
                  <IoCloseSharp className="text-xl"/>
                </span>
                <div className="w-full flex justify-center items-center">
                  <h1 className="font-bold">Quick view</h1>
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
        )} */}
        {
          view && (
            <View view={view} setView={setView} setViewColor={setViewColor} viewColor={viewColor}/>
          )
        }
        {variation && (
          <div className="w-full h-full left-0 z-50 top-0 flex justify-center items-center bg-slate-950 bg-opacity-40 absolute ">
            <div className="w-[62%] max-h-screen h-auto bg-white rounded-xl flex flex-col overflow-hidden">
              <div className="w-full py-2 flex justify-center items-center relative border-b">
                {/* <ImCross
                  className="ml-4 "
                  onClick={() => setVariation(!variation)}
                /> */}
                <span className="rounded-lg p-1 hover:bg-slate-100 absolute left-2">
                <IoCloseSharp className="text-xl " onClick={() => setVariation(!variation)}/>
                </span>
                <span className=" font-bold text-lg">
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
