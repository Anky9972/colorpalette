import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div 
      className="flex items-center justify-center h-screen w-screen bg-white fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-12 h-12 border-2 border-t-black border-gray-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ ease: "linear", repeat: Infinity, duration: 1 }}
      ></motion.div>
    </motion.div>
  );
};

export default Loader;
