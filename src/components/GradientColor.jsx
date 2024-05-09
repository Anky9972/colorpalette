import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { ColorState } from '../context/ColorState';
import { ImCross } from 'react-icons/im';
import { Authentication } from '../context/Authentication';

const GradientColor = () => {
  const [colors, setColors] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const {menu,setMenu,showsavedcolors,setShowsavedcolors} = useContext(ColorState);
  const {singleColor,fullPalette} = useContext(Authentication)

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const generatePalette = () => {
    const newColors = [];
    for (let i = 0; i < 5; i++) {
      const color1 = generateRandomColor();
      const color2 = generateRandomColor();
      const gradient = `linear-gradient(to right, ${color1}, ${color2})`;
      newColors.push(gradient);
    }
    setColors(newColors);
  };

  const handleCopyCode = (index) => {
    navigator.clipboard.writeText(colors[index]);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
    toast.success('Gradient copied to clipboard!')
  };

  useEffect(() => {
    generatePalette(); 
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        generatePalette();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [generatePalette]);


  function handleGenerateButtonClick() {
    generatePalette();
    // Trigger spacebar keydown event
    const event = new KeyboardEvent("keydown", { keyCode: 32 });
    document.body.dispatchEvent(event);
  }

  return (
    <>
    <div className="w-full h-full flex flex-col   bg-red-200  ">
      
      <div className=" flex flex-col justify-center items-end mt-[117px] md:mt-[128]  w-full h-auto">
      <div className=" md:hidden left-5 absolute z-40 bottom-0">
          <button className="w-24 h-10 bg-slate-200" onClick={handleGenerateButtonClick}>Generate</button>
        </div>
        {colors.map((color, index) => (
          <motion.div
            key={index}
            className="w-full h-[110px] md:h-[118px] relative"
            style={{ background: color }}
            onClick={() => handleCopyCode(index)}
          >
            
          </motion.div>
        ))}
        {menu && (
          <motion.div
            className=" h-full md:h-[82.8%]  right-0  absolute  md:z-0 z-40 bg-white  w-full top-0 md:mt-[121px] md:top-0  md:w-[20%] overflow-y-scroll"
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
    </div>
        </>
  );
};

export default GradientColor;
