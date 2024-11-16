import { NavLink } from "react-router-dom";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import FeaturesSection from "./FeaturesSection";

function Home() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();

  const colors = useMemo(
    () => [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#33CC99",
      "#FFCC00",
      "#CC6699",
      "#66CCCC",
      "#6699CC",
      "#CC9933",
      "#DD3366",
      "#191970",
      "#231F20",
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [colors]);

  useEffect(() => {
    const animateBackground = async () => {
      await controls.start({
        background: `linear-gradient(135deg, ${
          colors[currentColorIndex]
        }aa, ${colors[(currentColorIndex + 1) % colors.length]}aa, ${
          colors[(currentColorIndex + 2) % colors.length]
        }aa)`,
        transition: { duration: 5, ease: "linear" },
      });
    };
    animateBackground();
  }, [colors, currentColorIndex, controls]);

  return (
    <>
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-10 overflow-hidden">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={controls}
        style={{
          background: `linear-gradient(135deg, ${colors[0]}aa, ${colors[1]}aa, ${colors[2]}aa)`,
        }}
      />

      {/* Particle Effect Background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Animated Floating Bubbles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block"
          style={{
            width: `${Math.random() * 100 + 100}px`,
            height: `${Math.random() * 100 + 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["-10%", "10%", "-10%"],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-white/10 backdrop-blur-lg rounded-full" />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        className="text-center z-10 mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Animated Logo/Icon */}
        <motion.div
          className="mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500" />
        </motion.div>

        {/* Main Heading with Enhanced Animation */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-wider"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 animate-gradient-x">
            Palette Generator
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 text-base md:text-lg lg:text-2xl text-gray-200 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Your portal to vibrant creativity. Discover and create stunning color combinations
          that bring your designs to life.
        </motion.p>
      </motion.div>

      {/* Enhanced Buttons Section */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 md:gap-6 mt-8 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <NavLink to="/generate">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="w-64 h-14 rounded-xl text-lg font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30 transition-all duration-300 hover:bg-white/30"
          >
            Generate Palettes
          </motion.button>
        </NavLink>
        <NavLink to="/explore">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="w-64 h-14 rounded-xl text-lg font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30 transition-all duration-300 hover:bg-white/30"
          >
            Explore Palettes
          </motion.button>
        </NavLink>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 text-white text-sm z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-white/70">Scroll to Explore</span>
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full p-1"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-1 h-2 bg-white rounded-full mx-auto"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
      <FeaturesSection/>
      </>
  );
}

export default Home;
