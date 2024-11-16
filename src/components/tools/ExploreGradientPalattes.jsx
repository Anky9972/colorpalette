import React, { useState, useEffect, useRef } from 'react';
import { Heart, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const ExploreGradientPalettes = () => {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const ITEMS_PER_PAGE = 10;

  // Generate random hex color
  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  // Generate a palette with n colors
  const generatePalette = () => {
    const numColors = Math.floor(Math.random() * 6) + 5; // 5-10 colors
    const colors = Array(numColors).fill().map(() => generateRandomColor());
    const likes = Math.floor(Math.random() * 100000);
    return {
      id: Math.random().toString(36).substr(2, 9),
      colors,
      likes
    };
  };

  // Load more palettes
  const loadMorePalettes = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newPalettes = Array(ITEMS_PER_PAGE).fill().map(generatePalette);
      setPalettes(prev => [...prev, ...newPalettes]);
      setLoading(false);
      setPage(prev => prev + 1);
    }, 1000);
  };

  // Initial load
  useEffect(() => {
    const initialPalettes = Array(50).fill().map(generatePalette);
    setPalettes(initialPalettes);
  }, []);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMorePalettes();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  // Format number with k/m suffix
  const formatNumber = (num) => {
    if (num >= 1000000) return (num/1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num/1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="w-full min-h-screen bg-white p-8">
      <div className="w-full max-w-6xl mx-auto p-2">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Gradient Color Palettes</h1>
          <p className="text-gray-500">
            Get inspired by these beautiful gradient color schemes and make something cool!
          </p>
        </div>

        {/* Palettes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {palettes.map((palette) => (
            <div 
              key={palette.id}
            >
              {/* Palette Colors */}
              <div className="h-32 flex rounded-xl overflow-hidden">
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 hover:flex-[2] transition-all duration-200 relative group"
                    style={{ backgroundColor: color }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity">
                      <span className="bg-white px-2 z-10 py-1 rounded text-xs font-medium shadow-sm">
                        {color.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Palette Footer */}
              <div className="px-4 py-2 flex items-center justify-end gap-2">
                <div className="flex items-center gap-1 text-gray-500">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{formatNumber(palette.likes)}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        <div ref={loaderRef} className="mt-8 text-center">
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
    </div>
  );
};

export default ExploreGradientPalettes;

