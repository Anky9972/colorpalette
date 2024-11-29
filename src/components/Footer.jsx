import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

const SocialIcon = ({ children }) => (
  <motion.li
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.span
      className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-purple-100 hover:bg-purple-200 transition-colors duration-200 cursor-pointer text-purple-600"
    >
      {React.cloneElement(children, { className: "w-4 h-4 md:w-5 md:h-5" })}
    </motion.span>
  </motion.li>
);

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 pt-8 md:pt-12 pb-6 md:pb-8">
      <div className="w-full flex justify-center mb-8">
      <h1 className="text-3xl font-bold font-[yellowtail]">Palettes</h1>
      </div>
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 after:content-[''] after:block after:w-12 after:h-1 after:bg-purple-500 after:mt-2">
              Tools
            </h3>
            <ul className="flex flex-col space-y-2 text-gray-600">
              <a href="/generate">Generate your palettes</a>
              <a href="/explore">Explore popular palettes</a>
              <a href="/explore/gradient">Explore gradient palettes</a>
              <a href="/image-picker">Extract palette from image</a>
              <a href="/contrast-checker">Contrast checker</a>
              <a href="/upcoming">Preview palettes on designs</a>
              <a href="/upcoming">Recolor your own design</a>
              <a href="/upcoming">Color picker</a>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 after:content-[''] after:block after:w-12 after:h-1 after:bg-purple-500 after:mt-2">
              More
            </h3>
            <ul className="flex flex-col space-y-2 text-gray-600">
              <a href="/colors">List of colors</a>
              <a href="/gradients">Browse gradients</a>
              <a href="/gradient-maker">Create a gradient</a>
              <a href="/gradient-palette">Make a gradient palette</a>
              <a href="/upcoming">Image converter</a>
              <a href="/upcoming">Create a collage</a>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 after:content-[''] after:block after:w-12 after:h-1 after:bg-purple-500 after:mt-2">
              Company
            </h3>
            <ul className="flex flex-col space-y-2 text-gray-600">
              <a href="/terms">Terms of service</a>
              <a href="privacy">Privacy policy</a>
              <a href="/contact">Contact</a>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-200 pt-6 md:pt-8"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
            <motion.p 
              variants={itemVariants}
              className="text-sm md:text-base text-gray-600 text-center lg:text-left"
            >
              &copy; {new Date().getFullYear()} Palettes. Bringing color and creativity to the world.
            </motion.p>

            <motion.div variants={itemVariants}>
              <ul className="flex items-center gap-4 md:gap-6">
                <SocialIcon>
                  <FaXTwitter />
                </SocialIcon>
                <SocialIcon>
                  <FaFacebookF />
                </SocialIcon>
                <SocialIcon>
                  <FaInstagram />
                </SocialIcon>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;