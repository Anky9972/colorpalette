import React from 'react';
import { motion } from 'framer-motion';

const featuresData = [
  {
    title: "Generate Palettes",
    description: "Instantly create stunning color palettes with just a click. Our intuitive algorithm generates harmonious combinations based on your preferences, giving you endless inspiration for your projects.",
    delay: 1.2
  },
  {
    title: "Explore All Palettes",
    description: "Dive into a vast library of curated color palettes from our community of creators. Browse through a diverse range of styles, themes, and moods to find the perfect palette for your next masterpiece.",
    delay: 1.4
  },
  {
    title: "Gradient Palettes",
    description: "Discover the beauty of gradients with our Gradient Palettes feature. Create smooth transitions between colors or experiment with bold contrasts to add depth and dimension to your designs.",
    delay: 1.6
  },
  {
    title: "Adjust Palettes Color",
    description: "Customize your color palettes with precision using our advanced color adjustment tools. Fine-tune the hue, saturation, brightness, and more to achieve the perfect look for your project.",
    delay: 1.8
  }
];

function Features({ currentPage }) {
  return (
    <div className='hidden md:block second-page w-full h-screen bg-black '>
      <motion.div
        className='w-full h-1/4 absolute md:mt-10 flex justify-center items-center text-white'
        initial={{ x: -200, opacity: 0 }}
        animate={currentPage === 1 ? { x: 0, opacity: 1, transition: { duration: 1, delay: 0.8 } } : {}}
      >
        <h1 className='text-8xl font-bold'>Explore Palette Features</h1>
      </motion.div>
      <div className='w-full h-full bg-black flex justify-center items-center '>
        <motion.div className='w-4/5 h-4/5 md:mt-10 bg-black flex justify-around items-center'>
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 200, opacity: 0 }}
              animate={currentPage === 1 ? { y: 0, opacity: 1, transition: { duration: 1, delay: feature.delay } } : {}}
              className='w-1/5 h-1/2 flex flex-col justify-around items-center p-2'
            >
              <motion.h2
                initial={{ y: 100, opacity: 0 }}
                animate={currentPage === 1 ? { y: 0, opacity: 1, transition: { duration: 1, delay: feature.delay + 0.2 } } : {}}
                className='h-16 w-full text-white text-2xl flex justify-center font-bold items-center'
              >
                <span>{feature.title}</span>
              </motion.h2>
              <p className='w-full h-3/4 text-center rounded-xl bg-slate-200 p-4 text-sm'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Features;
