import React, { useContext } from "react";
import { motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import { ColorState } from "../../context/ColorState";
import { Authentication } from "../../context/Authentication";

const ToolsMenu = () => {
  const { menu, setMenu, showsavedcolors, setShowsavedcolors } = useContext(ColorState);
  const {
    singleColor,
    isLoggedIn,
    fullPalette,
    signin,
    setSignin
  } = useContext(Authentication);

  return (
    <div className=" bg-black bg-opacity-45 w-full flex flex-col items-end md:flex-[1.2] right-0 fixed md:relative md:z-0 z-30 top-0 h-full">
      <motion.div
        className="h-full  bg-white w-11/12 md:w-full"
        initial={{ flex: 0 }}
        animate={{ flex: 2 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full py-2 border-b flex justify-center items-center relative">
          <span
            className="absolute left-1 rounded-lg p-1 hover:bg-slate-100 flex justify-center items-center cursor-pointer"
            onClick={() => setMenu(!menu)}
          >
            <IoCloseSharp className="text-xl" />
          </span>
          <div className="flex gap-5 text-sm items-center">
            <button
              className={`h-8 ${showsavedcolors ? "font-bold text-base" : ""}`}
              onClick={() => setShowsavedcolors(true)}
            >
              Colors
            </button>
            <button
              className={`h-8 ${!showsavedcolors ? "font-bold text-base" : ""}`}
              onClick={() => setShowsavedcolors(false)}
            >
              Palettes
            </button>
          </div>
        </div>
        <div className="w-full h-full flex flex-col justify-center items-start p-4 overflow-auto">
          {isLoggedIn ? (
            showsavedcolors ? (
              <div className="w-full h-full flex flex-col gap-1">
                {singleColor.length > 0 ? (
                  singleColor.map((saved, index) => (
                    <div
                      key={index}
                      style={{ backgroundColor: saved }}
                      className="w-full h-10 my-1 rounded-lg"
                    ></div>
                  ))
                ) : (
                  <p className="w-full text-center">Your saved colors will appear here.</p>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex flex-col gap-1">
                {fullPalette.length > 0 ? (
                  fullPalette.map((palette, paletteIndex) => (
                    <div
                      key={paletteIndex}
                      className="flex rounded-xl overflow-hidden my-1"
                    >
                      {palette.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          style={{ backgroundColor: color.hex }}
                          className="w-full h-10"
                        ></div>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="w-full text-center">Your saved palettes will appear here.</p>
                )}
              </div>
            )
          ) : (
            <div className="w-full flex justify-center">
              <button
                className="px-2 py-2 bg-black rounded-lg text-white text-sm font-bold"
                onClick={() => setSignin(!signin)}
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ToolsMenu;
