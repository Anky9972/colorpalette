import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CiHeart } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const generateGradient = () => {
  const randomColor = () =>
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
  return [`#${randomColor()}`, `#${randomColor()}`];
};

const getContrastColor = (hexColor) => {
  const rgb = parseInt(hexColor.slice(1), 16); // Convert hex to RGB
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#FFFFFF"; 
};

const GradientPalette = () => {
  const [gradients, setGradients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMoreGradients();
  }, []);

  const loadMoreGradients = () => {
    setLoading(true);
    setTimeout(() => {
      const newGradients = Array.from({ length: 20 }, generateGradient);
      setGradients((prev) => [...prev, ...newGradients]);
      setLoading(false);
    }, 1000); // Added delay of 1 second
  };

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight * 0.8; // 80% of document height

    if (scrollPosition >= threshold && !loading) {
      loadMoreGradients();
    }
  };

  useEffect(() => {
    const debounceScroll = () => {
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => handleScroll(), 200); // Debounce delay of 200ms
    };

    window.addEventListener("scroll", debounceScroll);
    return () => window.removeEventListener("scroll", debounceScroll);
  }, [loading]);

  return (
    <div className="w-full flex flex-col gap-5 lg:gap-10 p-8">
      <div className="py-10">
        <h1 className="text-4xl font-extrabold text-center mb-4">Gradients</h1>
        <p className="text-center text-gray-500 mb-8">
          Explore beautiful gradients for your projects.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {gradients.map((colors, index) => (
          <div key={index} className="flex flex-col gap-2">
            <motion.div
              className="w-full h-32 lg:h-24 rounded-lg overflow-hidden relative"
              style={{
                background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="absolute inset-0 flex text-xs font-bold">
                <div
                  className="w-1/2 hover:w-3/4 uppercase opacity-0 hover:opacity-100 duration-200 transition-all h-full flex justify-center items-center"
                  style={{
                    backgroundColor: colors[0],
                    color: getContrastColor(colors[0]),
                  }}
                >
                  {colors[0]}
                </div>

                <div
                  className="w-1/2 hover:w-3/4 uppercase opacity-0 hover:opacity-100 duration-200 transition-all h-full flex justify-center items-center"
                  style={{
                    backgroundColor: colors[1],
                    color: getContrastColor(colors[1]),
                  }}
                >
                  {colors[1]}
                </div>
              </div>
            </motion.div>
            <div className="w-full flex justify-end gap-2">
              <span>
                <CiHeart className="text-lg" />
              </span>
              <span>
                <HiOutlineDotsHorizontal className="text-lg" />
              </span>
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <motion.div
          className="flex justify-center w-full my-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <div className="loader border-t-4 border-black rounded-full w-10 h-10 animate-spin"></div>
        </motion.div>
      )}
    </div>
  );
};

export default GradientPalette;
