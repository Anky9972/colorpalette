import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import colorNames from "color-name-list";
import { CiHeart } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Authentication } from "../../context/Authentication";
import ExploreMenu from "../explore/ExploreMenu";
import { motion } from "framer-motion";

const getColorCategory = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (r > g && r > b) return "Red";
  if (g > r && g > b) return "Green";
  if (b > r && b > g) return "Blue";
  if (r > 200 && g > 200 && b < 100) return "Yellow";
  if (r > 200 && b > 200) return "Pink";
  if (r < 100 && g < 100 && b < 100) return "Black";
  if (r > 200 && g > 200 && b > 200) return "White";
  return "Other";
};

const Colors = () => {
  const [colors, setColors] = useState([]);
  const [filteredColors, setFilteredColors] = useState([]);
  const [visibleColors, setVisibleColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loadCount, setLoadCount] = useState(20);
  const [loading, setLoading] = useState(false);
  const {handleSave} = useContext(Authentication);
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);
  const [exploremenu, setExploremenu] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const sortedColors = colorNames.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setColors(sortedColors);
    setFilteredColors(sortedColors);
    setVisibleColors(sortedColors.slice(0, 200));
  }, []);

  useEffect(() => {
    const newFilteredColors =
      selectedCategory === "All"
        ? colors
        : colors.filter(
            (color) => getColorCategory(color.hex) === selectedCategory
          );
    setFilteredColors(newFilteredColors);
    setVisibleColors(newFilteredColors.slice(0, 200));
    setLoadCount(50);
  }, [selectedCategory, colors]);

  const loadMoreColors = useCallback(() => {
    if (loading) return;

    setLoading(true);
    setTimeout(() => {
      const newCount = loadCount + 100;
      setVisibleColors(filteredColors.slice(0, newCount));
      setLoadCount(newCount);
      setLoading(false);
    }, 1000); 
  }, [loadCount, filteredColors, loading]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreColors();
        }
      },
      { threshold: 1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMoreColors]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const getContrastColor = (hexColor) => {
    const rgb = parseInt(hexColor.slice(1), 16); 
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#FFFFFF"; 
  };
  const toggleMenuVisibility = (index) => {
    setVisibleMenuIndex(prevIndex => (prevIndex === index ? null : index));
    setExploremenu(!exploremenu);
  };
  return (
    <div className="p-8 flex flex-col gap-5 lg:gap-10">
     <div className="w-full py-10">
      <h1 className="text-4xl font-extrabold text-center mb-4">Colors</h1>
      <p className="text-center text-gray-500 mb-8">
        Browse our library of more than 500 color names.
      </p>
        
     </div>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => handleCategoryClick("All")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
            selectedCategory === "All"
              ? "bg-blue-100 text-blue-500"
              : "bg-gray-100 text-black"
          }`}
        >
          All Shades
        </button>
        <button
          onClick={() => handleCategoryClick("Red")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
            selectedCategory === "Red"
              ? "bg-blue-100 text-blue-500"
              : "bg-gray-100 text-black"
          }`}
        >
          Red
        </button>
        <button
          onClick={() => handleCategoryClick("Green")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
            selectedCategory === "Green"
              ? "bg-blue-100 text-blue-500"
              : "bg-gray-100 text-black"
          }`}
        >
          Green
        </button>
        <button
          onClick={() => handleCategoryClick("Blue")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
            selectedCategory === "Blue"
              ? "bg-blue-100 text-blue-500"
              : "bg-gray-100 text-black"
          }`}
        >
          Blue
        </button>
        <button
          onClick={() => handleCategoryClick("Yellow")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
            selectedCategory === "Yellow"
              ? "bg-blue-100 text-blue-500"
              : "bg-gray-100 text-black"
          }`}
        >
          Yellow
        </button>
        <button
          onClick={() => handleCategoryClick("Pink")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
            selectedCategory === "Pink"
              ? "bg-blue-100 text-blue-500"
              : "bg-gray-100 text-black"
          }`}
        >
          Pink
        </button>
        <button
          onClick={() => handleCategoryClick("Black")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
            selectedCategory === "Black"
              ? "bg-blue-100 text-blue-500"
              : "bg-gray-100 text-black"
          }`}
        >
          Black
        </button>
        <button
          onClick={() => handleCategoryClick("White")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
            selectedCategory === "White"
              ? "bg-blue-100 text-blue-500"
              : "bg-gray-100 text-black"
          }`}
        >
          White
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 lg:gap-8">
        {visibleColors.map((color,index) => (
          <div className="flex flex-col gap-2 " key={index}>
            <div
              key={color.hex}
              className="rounded-lg h-32 lg:h-24 w-full border "
              style={{ backgroundColor: color.hex , color: getContrastColor(color.hex)}}
            >
              <p className=" text-sm uppercase font-bold opacity-0 w-full h-full hover:opacity-100 flex justify-center items-center">
                {color.hex}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-black font-semibold text-xs ">{color.name}</p>
              <div className="flex gap-2">
                <span>
                  <CiHeart className="text-lg" onClick={()=>handleSave(color.hex)}/>
                </span>
                <span>
                  <HiOutlineDotsHorizontal className="text-lg" onClick={() => toggleMenuVisibility(index)} />
                  {(visibleMenuIndex === index && exploremenu) && <ExploreMenu setExploremenu={setExploremenu} index={index}/>}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div ref={observerRef} className="h-10 mt-6"></div>
       {loading && (
        <div className='w-full flex justify-center items-center'>
        <motion.div 
          className="w-10 h-10 border-2 border-t-black border-gray-300 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ ease: "linear", repeat: Infinity, duration: 0.5 }}
        ></motion.div>
        </div>
      )}
    </div>
  );
};

export default Colors;
