import React, { useState, useEffect, useContext } from 'react';
import colorNameList from 'color-name-list';
import { toast } from 'react-hot-toast';
import { Authentication } from '../context/Authentication';
import { ColorState } from '../context/ColorState';
import { ImCross } from 'react-icons/im';
import {motion} from 'framer-motion';
function AllPalettes() {
  const [colorPalettes, setColorPalettes] = useState([]);
  const {menu,setMenu,showsavedcolors,setShowsavedcolors} = useContext(ColorState);
  const {singleColor,fullPalette} = useContext(Authentication)
  // Function to generate random integer
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to convert rgb color to hex
  function rgbToHex(rgb) {
    return '#' + rgb.map(component => {
      const hex = component.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  // Function to generate random color palette
  function generateRandomPalette() {
    const paletteSize = getRandomInt(5, 9);
    const palette = [];
    for (let i = 0; i < paletteSize; i++) {
      const rgbColor = [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
      const hexColor = rgbToHex(rgbColor);
      palette.push({ rgb: `rgb(${rgbColor.join(', ')})`, hex: hexColor });
    }
    return palette;
  }

  // Function to copy color code to clipboard
  function copyColorCode(rgbColor, hexColor) {
    const textToCopy = `${hexColor}`;
    navigator.clipboard.writeText(textToCopy);
    toast.success(`Color copied to clipboard!`);
  }

  // Creating nearest color object
  const colors = colorNameList.reduce((obj, color) => {
    obj[color.name] = color.hex;
    return obj;
  }, {});




  // Function to determine if text should be light or dark
  function getTextColor(hexColor) {
    
    const rgbColor = hexToRgb(hexColor);
    
    const luminance = (0.2126 * rgbColor.r + 0.7152 * rgbColor.g + 0.0722 * rgbColor.b) / 255;
    // Return light color for dark backgrounds, dark color for light backgrounds
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }

  // Function to convert hex color to RGB
  function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  useEffect(() => {
    
    generateNewPalettes();
  
    
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [generateNewPalettes, handleScroll]);
  

  function generateNewPalettes() {
    if (colorPalettes.length < 500) {
      const newPalettes = Array.from({ length: 10 }, () => generateRandomPalette());
      setColorPalettes(prevPalettes => [...prevPalettes, ...newPalettes]);
    }
  }

  function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // Calculate the distance scrolled from the top
    const scrollDistance = scrollTop + clientHeight;
    // Calculate the height of the scrollable area
    const scrollableHeight = scrollHeight - clientHeight;
    // Calculate the scroll percentage
    const scrollPercentage = (scrollDistance / scrollableHeight) * 100;
    // Check if the scroll percentage is greater than or equal to 80%
    if (scrollPercentage >= 80) {
      // Delay the generation of new palettes by 500ms
      setTimeout(() => {
        // Generate new palettes
        generateNewPalettes();
      }, 500);
    }
  }
  

  return (
    <>
      <div className=' h-3/5 w-full flex flex-col justify-center gap-10 items-center'>
        <h1 className='text-5xl text-center   font-extrabold'>Explore Thousands Of Color Palettes</h1>
        <p className='text-lg w-4/5 md:w-1/3 text-center font-bold text-slate-400'>
          <span> Click on any color to copy its code.</span> <br />You can also hover over the color to see its hex code.
        </p>
        {menu && (
          <motion.div
            className=" h-full md:h-[82.8%]  right-0  absolute  md:z-0 z-40 bg-white  w-full top-0 md:mt-[125px] md:top-0  md:w-[20%] overflow-y-scroll"
            // initial={{ width: 0 }}
            // animate={{ width: "120%" }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { duration: 0.5, delay: 0.2 },
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
      </div>
      <div className=" md:hidden w-full h-full  gap-9 p-6">
        {colorPalettes.map((palette, paletteIndex) => (
          <div key={paletteIndex} className="flex flex-row w-full h-24 mt-5 overflow-x-hidden justify-center items-center rounded-lg">
            {palette.map((color, colorIndex) => (
              <div
                key={colorIndex}
                className="flex h-full justify-center items-center"
                style={{ backgroundColor: color.rgb, color: getTextColor(color.hex), flexBasis: `${100 / palette.length}%` }}
                onClick={() => copyColorCode(color.rgb, color.hex)}
              >
                <div className="w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                  <span className='text-xs font-semibold'>{color.hex.split('#').pop().toUpperCase()}</span>
                </div>
              </div>
            ))}
            
          </div>
        ))}
        
      </div>
      <div className=" hidden md:grid w-full h-full  grid-cols-3 gap-9 p-10">
        {colorPalettes.map((palette, paletteIndex) => (
          <div key={paletteIndex} className="flex flex-row w-full h-32 mt-5 overflow-x-hidden justify-center items-center rounded-lg">
            {palette.map((color, colorIndex) => (
              <div
                key={colorIndex}
                className="flex h-full justify-center items-center"
                style={{ backgroundColor: color.rgb, color: getTextColor(color.hex), flexBasis: `${100 / palette.length}%` }}
                onClick={() => copyColorCode(color.rgb, color.hex)}
              >
                <div className="w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                  <span className='text-xs font-semibold'>{color.hex.split('#').pop().toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default AllPalettes;
