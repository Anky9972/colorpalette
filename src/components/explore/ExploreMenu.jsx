import React, { useEffect, useState } from "react";
import { BiPalette, BiFullscreen, BiBorderAll } from "react-icons/bi";
import { MdOutlineContentCopy, MdOutlineExplore } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { TbContrast, TbArrowsMaximize } from "react-icons/tb";
import { PiExport, PiEye, PiMagicWandDuotone } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion";

function ExploreMenu({setExploremenu, index}) {
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      console.log('Window width:', window.innerWidth);  // Log the window width for debugging
      if (window.innerWidth < 768) {  // Adjust threshold to 768px for tablets and smaller
        setMobileMenu(true);
      } else {
        setMobileMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Call it once on mount to set the initial state
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log('Mobile menu state:', mobileMenu);  // Log the mobileMenu state for debugging
  }, [mobileMenu]);

  return (
    <>
      {mobileMenu ? (
        <motion.div
        key={index}
          initial={{ y: 20 }}
          animate={{  y: 0 }}
          transition={{ duration: 0.5, easings: "easeInOut" }}
          className="fixed z-10 w-full bg-white right-0 bottom-0 border border-gray-200 rounded-t-xl"
        >
          <ul className="p-5 ">
            <span className="absolute top-5 right-5">
            <IoCloseSharp 
              className="text-xl cursor-pointer "
              onClick={() => setExploremenu(false)} // Close the menu on click
            />
            </span>
            {[
              { icon: <BiPalette />, text: "Open palette" },
              { icon: <PiMagicWandDuotone />, text: "Open in the generator" },
              { icon: <MdOutlineContentCopy />, text: "Copy URL" },
              { icon: <MdOutlineExplore />, text: "Explore similar" },
              { icon: <PiEye />, text: "Quick view" },
              { icon: <BiBorderAll />, text: "View variations", new: true },
              { icon: <TbContrast />, text: "Check contrast", new: true },
              {
                icon: <TbArrowsMaximize />,
                text: "Visualize colors",
                new: true,
              },
              { icon: <BiFullscreen />, text: "View fullscreen" },
              { icon: <PiExport />, text: "Export palette" },
              { icon: <AiOutlineHeart />, text: "Save palette" },
            ].map((item, index) => (
              <li
                key={index}
                onClick={() => setMobileMenu(false)} // Close the menu on item click
                className="flex items-center gap-5 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium text-xl">{item.text}</span>
                {/* {item.new && (
                  <span className="bg-pink-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
                    NEW
                  </span>
                )} */}
              </li>
            ))}
          </ul>
        </motion.div>
      ) : (
        <div
        key={index}
          className="absolute z-10 right-0 top-5 bg-white shadow-lg rounded-xl border border-gray-200 transition-opacity duration-200"
        >
          <ul className="p-2">
            {[
              { icon: <BiPalette />, text: "Open palette" },
              { icon: <PiMagicWandDuotone />, text: "Open in the generator" },
              { icon: <MdOutlineContentCopy />, text: "Copy URL" },
              { icon: <MdOutlineExplore />, text: "Explore similar" },
              { icon: <PiEye />, text: "Quick view" },
              { icon: <BiBorderAll />, text: "View variations", new: true },
              { icon: <TbContrast />, text: "Check contrast", new: true },
              {
                icon: <TbArrowsMaximize />,
                text: "Visualize colors",
                new: true,
              },
              { icon: <BiFullscreen />, text: "View fullscreen" },
              { icon: <PiExport />, text: "Export palette" },
              { icon: <AiOutlineHeart />, text: "Save palette" },
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center text-xs gap-3 px-1 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                <span className="text-md">{item.icon}</span>
                <span className="flex-grow font-bold">{item.text}</span>
                {/* {item.new && (
                  <span className="bg-pink-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
                    NEW
                  </span>
                )} */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default ExploreMenu;
