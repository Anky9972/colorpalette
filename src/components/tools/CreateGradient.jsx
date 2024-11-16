import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { Heart, MoreHorizontal } from 'lucide-react';

import Share from './Share';
import { useNavigate } from 'react-router-dom';

const CreateGradient = () => {
  const [startColor, setStartColor] = useState('#FCF4DF');
  const [endColor, setEndColor] = useState('#EFB7EA');
  const [numberOfColors, setNumberOfColors] = useState(7);
  const [share, setShare] = useState(false);
  
  // Function to generate colors between two hex colors
  const generateGradientColors = (start, end, steps) => {
    const startRGB = hexToRGB(start);
    const endRGB = hexToRGB(end);
    
    const colors = [];
    for (let i = 0; i < steps; i++) {
      const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * (i / (steps - 1)));
      const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * (i / (steps - 1)));
      const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * (i / (steps - 1)));
      colors.push(rgbToHex(r, g, b));
    }
    return colors;
  };

  const hexToRGB = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
  };

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  const handleRandom = () => {
    setStartColor(generateRandomColor());
    setEndColor(generateRandomColor());
  };

  const gradientColors = generateGradientColors(startColor, endColor, numberOfColors);
  function handleEmbeddbutton(colors){
    
  }

  return (
    <div className='w-full min-h-screen bg-white p-8'>
      <div className="w-full py-10 mb-10 flex flex-col gap-5">
        <h1 className="text-5xl font-extrabold text-center mb-4">Create Gradient</h1>
        <p className="text-center text-gray-500">
          Create gradients with custom start and end colors.
        </p>
      </div>
      
      <div className="w-full max-w-4xl mx-auto">
        {/* Gradient Preview */}
        <div className="w-full h-60 rounded-xl mb-8 flex overflow-hidden border">
          {gradientColors.map((color, index) => (
            <div
              key={index}
              className="flex-1 hover:flex-[2] h-full relative group transition-all duration-300"
              style={{ backgroundColor: color }}
            >
              <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-200">
                <span className="bg-white px-3 z-10 py-2 rounded-lg shadow-lg text-xs font-medium">
                  {color.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex">
          <div className="flex flex-wrap gap-4 items-end w-full">
            {/* Start Color */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-600">
                Start color
              </label>
              <div className="flex h-9">
                <input
                  type="text"
                  value={startColor.toUpperCase()}
                  onChange={(e) => setStartColor(e.target.value)}
                  className="w-28 text-sm py-2 px-3 border border-r-0 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="relative w-10 p-1 border rounded-r-lg border-l-0">
                  <input
                    type="color"
                    value={startColor}
                    onChange={(e) => setStartColor(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div 
                    className="h-full w-full rounded-md"
                    style={{ backgroundColor: startColor }}
                  />
                </div>
              </div>
            </div>

            {/* End Color */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-600">
                End color
              </label>
              <div className="flex h-9">
                <input
                  type="text"
                  value={endColor.toUpperCase()}
                  onChange={(e) => setEndColor(e.target.value)}
                  className="w-28 text-sm py-2 px-3 border border-r-0 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="relative w-10 p-1 border rounded-r-lg border-l-0">
                  <input
                    type="color"
                    value={endColor}
                    onChange={(e) => setEndColor(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div 
                    className="h-full w-full rounded-md"
                    style={{ backgroundColor: endColor }}
                  />
                </div>
              </div>
            </div>

            {/* Number of Colors */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-600">
                Number of colors
              </label>
              <div className="flex items-center h-9">
                <input
                  type="number"
                  value={numberOfColors}
                  onChange={(e) => setNumberOfColors(Math.max(2, Math.min(30, parseInt(e.target.value) || 2)))}
                  className="w-28 h-full text-sm py-2 px-3 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  min="2"
                  max="30"
                />
                <div className="flex flex-col items-center justify-center border border-l-0 h-9 rounded-r-lg">
                  <button
                    onClick={() => setNumberOfColors(prev => Math.min(30, prev + 1))}
                    className="flex-1 border-b text-gray-400 hover:text-gray-600"
                  >
                    <RiArrowDropUpLine className='text-xl'/>
                  </button>
                  <button
                    onClick={() => setNumberOfColors(prev => Math.max(2, prev - 1))}
                    className="flex-1 text-gray-400 hover:text-gray-600"
                  >
                    <RiArrowDropDownLine className='text-xl'/>
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 items-center ml-auto">
              <button
                onClick={handleRandom}
                className="h-9 px-5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                Random
              </button>
              <div className='flex'>
                <button
                  className="h-9 px-4 border-r bg-black rounded-l-lg text-white text-sm font-bold hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={()=>setShare(!share)}
                >
                  Export
                </button>
                <button className='bg-black rounded-r-lg text-white p-1'>
                  <ChevronDown/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        share && (
          <Share share={share} setShare={setShare} handleEmbeddbutton={handleEmbeddbutton}/>
        )
      }
      <ExamplePalettes />
    </div>
  );
};

export default CreateGradient;

const ExamplePalettes = () => {
  const palettes = [
    {
      id: 1,
      colors: ['#5B2C6F', '#884EA0', '#C39BD3', '#E8DAEF', '#FADBD8']
    },
    {
      id: 2,
      colors: ['#F7DC6F', '#F8C471', '#F1948A', '#FF69B4', '#FF1493']
    },
    {
      id: 3,
      colors: ['#5C3317', '#8B4513', '#A0522D', '#BC8F8F', '#D3D3D3']
    },
    {
      id: 4,
      colors: ['#00FFFF', '#1E90FF', '#0000FF', '#00008B', '#000080']
    },
    {
      id: 5,
      colors: ['#40E0D0', '#89CFF0', '#B0C4DE', '#DDA0DD', '#FF69B4']
    },
    {
      id: 6,
      colors: ['#F0E68C', '#90EE90', '#98FB98', '#3CB371', '#228B22']
    }
  ];
  
  const navigate=useNavigate();
  return (
    <div className="w-full bg-white  py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-extrabold text-center mb-8">
          Example palettes
        </h1>

        {/* Palettes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {palettes.map((palette) => (
            <div 
              key={palette.id}
              
            >
              {/* Color Stripes */}
              <div className="h-24 flex overflow-hidden rounded-xl">
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 hover:flex-[2] transition-all duration-200 relative group "
                    style={{ backgroundColor: color }}
                  >
                    {/* Hover Color Code */}
                    <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-200">
                      <span className="bg-white px-2 z-10 py-1 rounded text-xs font-medium shadow-sm">
                        {color.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-3 py-2 flex justify-end border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full flex justify-center items-center py-10'>
        <button onClick={()=>navigate("/explore/gradient")} className='px-5 py-2 border rounded-lg font-bold text-sm'>Browse more gradient palettes</button>
      </div>
    </div>
  );
};
