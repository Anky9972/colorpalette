import React, { useState, useEffect, useContext } from 'react';
import colorNameList from 'color-name-list';
import { toast } from 'react-hot-toast';
import { Authentication } from '../context/Authentication';
import { ColorState } from '../context/ColorState';
import { CiHeart } from 'react-icons/ci';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import ExploreMenu from './explore/ExploreMenu';
import { motion } from 'framer-motion';

function AllPalettes() {
  const [colorPalettes, setColorPalettes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { menu, setMenu, showsavedcolors, setShowsavedcolors } = useContext(ColorState);
  const { singleColor, fullPalette, SaveFullPalette } = useContext(Authentication);
  const [exploremenu, setExploremenu] = useState(false);
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);
  const [savedPalettes, setSavedPalettes] = useState([]);

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const rgbToHex = (rgb) => '#' + rgb.map(component => (component.toString(16).padStart(2, '0'))).join('');

  const generateRandomPalette = () => {
    const paletteSize = getRandomInt(5, 9);
    const palette = [];
    for (let i = 0; i < paletteSize; i++) {
      const rgbColor = [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
      const hexColor = rgbToHex(rgbColor);
      palette.push({ rgb: `rgb(${rgbColor.join(', ')})`, hex: hexColor });
    }
    return palette;
  };

  const copyColorCode = async (hexColor) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(hexColor);
        toast.success(`Copied ${hexColor} to clipboard!`);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = hexColor;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast.success(`Copied ${hexColor} to clipboard!`);
      }
    } catch (error) {
      toast.error('Failed to copy color code');
      console.error(error);
    }
  };

  const getTextColor = (hexColor) => {
    const rgbColor = hexToRgb(hexColor);
    const luminance = (0.2126 * rgbColor.r + 0.7152 * rgbColor.g + 0.0722 * rgbColor.b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
  };

  const generateNewPalettes = () => {
    if (colorPalettes.length < 500) {
      setLoading(true);
      setTimeout(() => {
        const newPalettes = Array.from({ length: 10 }, () => generateRandomPalette());
        setColorPalettes(prevPalettes => [...prevPalettes, ...newPalettes]);
        setLoading(false);
      }, 500);
    }
  };

  const loadInitialPalettes = () => {
    const initialPalettes = Array.from({ length: 50 }, () => generateRandomPalette());
    setColorPalettes(initialPalettes);
  };

  useEffect(() => {
    if (colorPalettes.length === 0) loadInitialPalettes();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      generateNewPalettes();
    }
  };


  const toggleMenuVisibility = (index) => {
    setVisibleMenuIndex(prevIndex => (prevIndex === index ? null : index));
    setExploremenu(!exploremenu);
  };

  return (
    <div className='w-full min-h-screen'>
      {/* Header Section */}
      <div className='h-3/5 w-full flex flex-col justify-center gap-10 items-center'>
        <h1 className='p-2 text-center text-5xl font-bold pt-10'>Explore Thousands Of Color Palettes</h1>
        <p className='text-lg w-4/5 md:w-1/3 text-center text-slate-500 pb-10'>
          <span>Click on any color to copy its code.</span> <br />You can also hover over the color to see its hex code.
        </p>
      </div>

      {/* Palettes Section */}
      <div className="grid w-full h-full grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4  p-5">
        {colorPalettes.map((palette, paletteIndex) => (
          <div key={paletteIndex} className='flex flex-col gap-2'>
            <div className="flex flex-row w-full h-24 overflow-x-hidden justify-center items-center rounded-xl">
              {palette.map((color, colorIndex) => (
                <div
                  key={colorIndex}
                  className="flex-1 hover:flex-[1.5] transition-all duration-200 h-full justify-center items-center"
                  style={{ backgroundColor: color.rgb, color: getTextColor(color.hex) }}
                  onClick={() => copyColorCode(color.hex)}
                >
                  <div className="w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                    <span className='text-xs font-semibold'>{color.hex.split('#').pop().toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className='w-full flex justify-end gap-2 relative'>
              <CiHeart className='text-lg cursor-pointer' onClick={() => {SaveFullPalette(palette)}} />
              <HiOutlineDotsHorizontal className='text-lg hover:text-black cursor-pointer' onClick={() => toggleMenuVisibility(paletteIndex)} />
              {(visibleMenuIndex === paletteIndex && exploremenu) && <ExploreMenu setExploremenu={setExploremenu} index={paletteIndex} />}
            </div>
          </div>
        ))}
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
    </div>
  );
}

export default AllPalettes;
