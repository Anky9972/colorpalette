import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const GradientColor = () => {
  const [colors, setColors] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

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

  return (
    <>
    <div className="w-full h-full flex flex-col   bg-red-200  ">
      
      <div className=" flex flex-col justify-center items-end mt-[122px]  w-full h-auto">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            className="w-full h-[110px] md:h-[117px] relative"
            style={{ background: color }}
            onClick={() => handleCopyCode(index)}
          >
            
          </motion.div>
        ))}
      </div>
    </div>
        </>
  );
};

export default GradientColor;
